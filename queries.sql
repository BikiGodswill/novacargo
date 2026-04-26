-- ============================================================
-- NovaCargo — Complete Database Schema & Seed Data
-- Run this in your Supabase SQL Editor (Database → SQL Editor)
-- ============================================================

-- ── 0. Clean up (safe to re-run) ─────────────────────────────
DROP TABLE IF EXISTS timeline_events CASCADE;
DROP TABLE IF EXISTS shipments CASCADE;
DROP FUNCTION IF EXISTS update_updated_at CASCADE;

-- ── 1. Shipments table ────────────────────────────────────────
CREATE TABLE shipments (
  id                 UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_number    VARCHAR(20) UNIQUE NOT NULL,
  status             VARCHAR(50) NOT NULL DEFAULT 'Pending',
  service            VARCHAR(100) NOT NULL,
  weight             VARCHAR(50),
  dimensions         VARCHAR(100),
  description        TEXT,

  -- Sender
  sender_name        VARCHAR(200),
  sender_city        VARCHAR(100),
  sender_country     VARCHAR(100),

  -- Receiver
  receiver_name      VARCHAR(200),
  receiver_city      VARCHAR(100),
  receiver_country   VARCHAR(100),

  -- Route (human-readable)
  origin             VARCHAR(200),
  destination        VARCHAR(200),
  current_location   VARCHAR(200),

  -- Coordinates for live map
  origin_lat         DECIMAL(9,6),
  origin_lng         DECIMAL(9,6),
  destination_lat    DECIMAL(9,6),
  destination_lng    DECIMAL(9,6),
  current_lat        DECIMAL(9,6),
  current_lng        DECIMAL(9,6),

  -- Dates
  shipped_date       DATE,
  estimated_delivery DATE,
  actual_delivery    DATE,

  -- Meta
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. Timeline events table ──────────────────────────────────
CREATE TABLE timeline_events (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id  UUID        NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status       VARCHAR(100) NOT NULL,
  description  TEXT,
  location     VARCHAR(200),
  lat          DECIMAL(9,6),
  lng          DECIMAL(9,6),
  event_date   VARCHAR(100),
  completed    BOOLEAN     DEFAULT false,
  is_alert     BOOLEAN     DEFAULT false,
  sort_order   INTEGER     DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. Auto-update updated_at ─────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_shipments_updated_at
  BEFORE UPDATE ON shipments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── 4. Indexes ────────────────────────────────────────────────
CREATE INDEX idx_shipments_tracking   ON shipments(tracking_number);
CREATE INDEX idx_shipments_status     ON shipments(status);
CREATE INDEX idx_shipments_created    ON shipments(created_at DESC);
CREATE INDEX idx_timeline_shipment_id ON timeline_events(shipment_id);
CREATE INDEX idx_timeline_sort        ON timeline_events(shipment_id, sort_order);

-- ── 5. Row Level Security ─────────────────────────────────────
ALTER TABLE shipments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;

-- Public: anyone can read shipments (for tracking)
CREATE POLICY "Public read shipments"
  ON shipments FOR SELECT USING (true);

-- Public: anyone can read timeline events
CREATE POLICY "Public read timeline_events"
  ON timeline_events FOR SELECT USING (true);

-- Allow inserts from anon key (admin adds shipments via client-side auth)
-- NOTE: In production, replace with Supabase Auth user check
CREATE POLICY "Admin insert shipments"
  ON shipments FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin insert timeline_events"
  ON timeline_events FOR INSERT WITH CHECK (true);

-- Allow updates from anon key (for future admin edit features)
CREATE POLICY "Admin update shipments"
  ON shipments FOR UPDATE USING (true) WITH CHECK (true);

-- ── 6. Seed Data — 35 Shipments ──────────────────────────────
-- (Origin coords, Destination coords, Current coords)

INSERT INTO shipments (
  tracking_number, status, service, weight, dimensions, description,
  sender_name, sender_city, sender_country,
  receiver_name, receiver_city, receiver_country,
  origin, destination, current_location,
  origin_lat, origin_lng, destination_lat, destination_lng, current_lat, current_lng,
  shipped_date, estimated_delivery, actual_delivery
) VALUES

-- 1: Delivered — Shenzhen → London
('NC7841203648','Delivered','Express Delivery','2.4 kg','35 × 22 × 14 cm','Consumer Electronics',
 'Apex Electronics Ltd.','Shenzhen','China','Marcus Bellamy','London','United Kingdom',
 'Shenzhen, China','London, UK','London, UK',
 22.5431,114.0579, 51.5074,-0.1278, 51.5074,-0.1278,
 CURRENT_DATE-7, CURRENT_DATE, CURRENT_DATE),

-- 2: In Transit — Frankfurt → Nairobi (currently at Dubai hub)
('NC5293817402','In Transit','International Air','5.8 kg','60 × 40 × 30 cm','Medical Equipment',
 'GlobalMed Supplies','Frankfurt','Germany','City Hospital','Nairobi','Kenya',
 'Frankfurt, Germany','Nairobi, Kenya','International Hub, Dubai',
 50.1109,8.6821, -1.2921,36.8219, 25.2532,55.3657,
 CURRENT_DATE-3, CURRENT_DATE+2, NULL),

-- 3: Out for Delivery — Amsterdam → Amsterdam
('NC1047382915','Out for Delivery','Same-Day Delivery','0.8 kg','20 × 15 × 10 cm','Fresh Flowers',
 'Bloom Botanics','Amsterdam','Netherlands','Sophia Chen','Amsterdam','Netherlands',
 'Amsterdam, Netherlands','Amsterdam, Netherlands','Delivery Vehicle — Zone 4',
 52.3676,4.9041, 52.3676,4.9041, 52.3800,4.9200,
 CURRENT_DATE-1, CURRENT_DATE, NULL),

-- 4: Pending — Warsaw → Madrid
('NC9384720561','Pending','Economy Shipping','12.3 kg','80 × 60 × 50 cm','Furniture Parts',
 'Vertex Furniture Co.','Warsaw','Poland','HomeDecor Studio','Madrid','Spain',
 'Warsaw, Poland','Madrid, Spain','Warsaw, Poland',
 52.2297,21.0122, 40.4168,-3.7038, 52.2297,21.0122,
 CURRENT_DATE, CURRENT_DATE+8, NULL),

-- 5: Delayed — Toronto → Chicago (at Buffalo depot)
('NC3827461092','Delayed','Standard Shipping','3.2 kg','40 × 30 × 20 cm','Server Components',
 'TechVault Inc.','Toronto','Canada','Dev Solutions LLC','Chicago','United States',
 'Toronto, Canada','Chicago, USA','Regional Depot, Buffalo',
 43.6532,-79.3832, 41.8781,-87.6298, 42.8865,-78.8784,
 CURRENT_DATE-5, CURRENT_DATE+3, NULL),

-- 6: Delivered — Paris → Lagos
('NC6174839205','Delivered','Express Delivery','1.1 kg','25 × 18 × 8 cm','Luxury Apparel',
 'LuxeWear Paris','Paris','France','Amara Okonkwo','Lagos','Nigeria',
 'Paris, France','Lagos, Nigeria','Lagos, Nigeria',
 48.8566,2.3522, 6.5244,3.3792, 6.5244,3.3792,
 CURRENT_DATE-6, CURRENT_DATE-1, CURRENT_DATE-1),

-- 7: Processing — Detroit → Stuttgart
('NC8203947165','Processing','Freight Services','48.7 kg','120 × 80 × 70 cm','Automotive Parts',
 'AutoParts Express','Detroit','United States','Motors Plus GmbH','Stuttgart','Germany',
 'Detroit, USA','Stuttgart, Germany','Detroit Freight Terminal',
 42.3314,-83.0458, 48.7758,9.1829, 42.3314,-83.0458,
 CURRENT_DATE-1, CURRENT_DATE+10, NULL),

-- 8: In Transit — Tokyo → Sydney (at Singapore)
('NC4729381056','In Transit','International Air','2.9 kg','30 × 25 × 15 cm','Smart Devices',
 'SakuraTech','Tokyo','Japan','Nexus Retail','Sydney','Australia',
 'Tokyo, Japan','Sydney, Australia','Singapore International Hub',
 35.6762,139.6503, -33.8688,151.2093, 1.3644,103.9915,
 CURRENT_DATE-4, CURRENT_DATE+1, NULL),

-- 9: Delivered — New York → Cairo
('NC0583726491','Delivered','Standard Shipping','4.6 kg','45 × 35 × 25 cm','Academic Books',
 'BookWorld Publishing','New York','United States','Cairo University','Cairo','Egypt',
 'New York, USA','Cairo, Egypt','Cairo, Egypt',
 40.7128,-74.0060, 30.0444,31.2357, 30.0444,31.2357,
 CURRENT_DATE-9, CURRENT_DATE-2, CURRENT_DATE-2),

-- 10: Out for Delivery — Zurich → Vienna
('NC7362819405','Out for Delivery','Express Delivery','1.7 kg','28 × 20 × 12 cm','Sports Equipment',
 'Alpine Sports AG','Zurich','Switzerland','James Whitfield','Vienna','Austria',
 'Zurich, Switzerland','Vienna, Austria','Vienna Delivery Hub',
 47.3769,8.5417, 48.2082,16.3738, 48.2150,16.3800,
 CURRENT_DATE-2, CURRENT_DATE, NULL),

-- 11: In Transit — São Paulo → Lisbon (Mid-Atlantic)
('NC2918374056','In Transit','Freight Services','230 kg','200 × 150 × 120 cm','Food & Beverages',
 'Harvest Foods Co.','São Paulo','Brazil','SuperMart Europe','Lisbon','Portugal',
 'São Paulo, Brazil','Lisbon, Portugal','Mid-Atlantic Shipping Lane',
 -23.5505,-46.6333, 38.7223,-9.1393, 20.0,-30.0,
 CURRENT_DATE-8, CURRENT_DATE+5, NULL),

-- 12: Returned — Milan → Brussels
('NC5841729036','Returned','Economy Shipping','0.6 kg','18 × 12 × 8 cm','Fashion Accessories',
 'Online Boutique','Milan','Italy','Incorrect Address','Brussels','Belgium',
 'Milan, Italy','Brussels, Belgium','Milan, Italy',
 45.4642,9.1900, 50.8503,4.3517, 45.4642,9.1900,
 CURRENT_DATE-7, CURRENT_DATE-3, NULL),

-- 13: Delivered — Dubai → Dubai (same-day)
('NC3049182756','Delivered','Same-Day Delivery','3.5 kg','40 × 30 × 20 cm','Groceries',
 'FreshMart Grocery','Dubai','UAE','Khalid Al Rashidi','Dubai','UAE',
 'Dubai, UAE','Dubai, UAE','Dubai, UAE',
 25.2048,55.2708, 25.2048,55.2708, 25.2048,55.2708,
 CURRENT_DATE, CURRENT_DATE, CURRENT_DATE),

-- 14: In Transit — Mumbai → Jakarta (at Kuala Lumpur)
('NC8172039465','In Transit','International Air','7.2 kg','55 × 42 × 28 cm','Pharmaceutical Products',
 'Pharma Dynamics','Mumbai','India','HealthPlus Chain','Jakarta','Indonesia',
 'Mumbai, India','Jakarta, Indonesia','Kuala Lumpur Hub',
 19.0760,72.8777, -6.2088,106.8456, 3.1390,101.6869,
 CURRENT_DATE-3, CURRENT_DATE+2, NULL),

-- 15: Processing — Amsterdam → Buenos Aires
('NC6394817502','Processing','Express Delivery','1.4 kg','22 × 18 × 10 cm','Documents & Contracts',
 'NovaCargo HQ','Amsterdam','Netherlands','Elena Vasquez','Buenos Aires','Argentina',
 'Amsterdam, Netherlands','Buenos Aires, Argentina','Amsterdam, Netherlands',
 52.3676,4.9041, -34.6037,-58.3816, 52.3676,4.9041,
 CURRENT_DATE-1, CURRENT_DATE+4, NULL),

-- 16: Delivered — Helsinki → Stockholm
('NC7581930246','Delivered','Standard Shipping','9.1 kg','70 × 50 × 40 cm','Handcrafted Goods',
 'CraftWood Studios','Helsinki','Finland','Interior Hub','Stockholm','Sweden',
 'Helsinki, Finland','Stockholm, Sweden','Stockholm, Sweden',
 60.1699,24.9384, 59.3293,18.0686, 59.3293,18.0686,
 CURRENT_DATE-5, CURRENT_DATE-1, CURRENT_DATE-1),

-- 17: Delayed — Seoul → Manchester (stuck at Heathrow customs)
('NC2047391856','Delayed','International Air','3.8 kg','38 × 28 × 18 cm','Cosmetics & Skincare',
 'KoreanBeauty Co.','Seoul','South Korea','Beauty Box UK','Manchester','United Kingdom',
 'Seoul, South Korea','Manchester, UK','Customs Hold, Heathrow',
 37.5665,126.9780, 53.4808,-2.2426, 51.4700,-0.4543,
 CURRENT_DATE-6, CURRENT_DATE+2, NULL),

-- 18: Out for Delivery — Florence → Rome
('NC9283741650','Out for Delivery','Express Delivery','0.5 kg','15 × 12 × 6 cm','Fine Jewelry',
 'Artisan Jewels','Florence','Italy','Priya Nair','Rome','Italy',
 'Florence, Italy','Rome, Italy','Rome South Depot',
 43.7696,11.2558, 41.9028,12.4964, 41.8900,12.5000,
 CURRENT_DATE-1, CURRENT_DATE, NULL),

-- 19: In Transit — Guangzhou → Johannesburg (at Port of Durban)
('NC4816273059','In Transit','Freight Services','180 kg','180 × 130 × 100 cm','Industrial Machinery',
 'Pacific Machinery','Guangzhou','China','BuildCo Ltd.','Johannesburg','South Africa',
 'Guangzhou, China','Johannesburg, South Africa','Port of Durban',
 23.1291,113.2644, -26.2041,28.0473, -29.8587,31.0218,
 CURRENT_DATE-14, CURRENT_DATE+3, NULL),

-- 20: Delivered — Chicago → Chicago (same-day)
('NC1534892076','Delivered','Same-Day Delivery','2.1 kg','30 × 22 × 15 cm','Restaurant Order',
 'Gourmet Kitchen','Chicago','United States','Rachel Monroe','Chicago','United States',
 'Chicago, USA','Chicago, USA','Chicago, USA',
 41.8781,-87.6298, 41.8781,-87.6298, 41.8781,-87.6298,
 CURRENT_DATE, CURRENT_DATE, CURRENT_DATE),

-- 21: Pending — Munich → Cape Town
('NC6078341925','Pending','International Air','4.5 kg','42 × 32 × 22 cm','Solar Panels',
 'SolarTech GmbH','Munich','Germany','GreenEnergy Co.','Cape Town','South Africa',
 'Munich, Germany','Cape Town, South Africa','Munich, Germany',
 48.1351,11.5820, -33.9249,18.4241, 48.1351,11.5820,
 CURRENT_DATE, CURRENT_DATE+6, NULL),

-- 22: In Transit — Vancouver → Tokyo (Pacific)
('NC3920184765','In Transit','Express Delivery','1.9 kg','28 × 20 × 12 cm','Organic Foods',
 'Maple Leaf Exports','Vancouver','Canada','Tokyo Imports','Tokyo','Japan',
 'Vancouver, Canada','Tokyo, Japan','Pacific Air Transit',
 49.2827,-123.1207, 35.6762,139.6503, 42.0,-170.0,
 CURRENT_DATE-3, CURRENT_DATE+1, NULL),

-- 23: Delivered — London → Nairobi
('NC8451736290','Delivered','Economy Shipping','6.3 kg','55 × 40 × 30 cm','Educational Materials',
 'BookNest Publishers','London','United Kingdom','Nairobi Library','Nairobi','Kenya',
 'London, UK','Nairobi, Kenya','Nairobi, Kenya',
 51.5074,-0.1278, -1.2921,36.8219, -1.2921,36.8219,
 CURRENT_DATE-12, CURRENT_DATE-3, CURRENT_DATE-3),

-- 24: Processing — Oslo → Copenhagen
('NC0297465318','Processing','Freight Services','95 kg','150 × 100 × 80 cm','Timber & Building Materials',
 'Nordic Timber','Oslo','Norway','Construction AB','Copenhagen','Denmark',
 'Oslo, Norway','Copenhagen, Denmark','Oslo Freight Terminal',
 59.9139,10.7522, 55.6761,12.5683, 59.9139,10.7522,
 CURRENT_DATE-1, CURRENT_DATE+4, NULL),

-- 25: Out for Delivery — San Francisco → Seattle
('NC7134682905','Out for Delivery','Standard Shipping','3.1 kg','35 × 25 × 18 cm','Consumer Tech',
 'TechGadget US','San Francisco','United States','Oliver Hughes','Seattle','United States',
 'San Francisco, USA','Seattle, USA','Seattle Distribution Center',
 37.7749,-122.4194, 47.6062,-122.3321, 47.6100,-122.3400,
 CURRENT_DATE-3, CURRENT_DATE, NULL),

-- 26: Delivered — Delhi → New York
('NC5309182476','Delivered','International Air','2.7 kg','32 × 24 × 14 cm','Spices & Condiments',
 'Spice World India','Delhi','India','Flavour House','New York','United States',
 'Delhi, India','New York, USA','New York, USA',
 28.6139,77.2090, 40.7128,-74.0060, 40.7128,-74.0060,
 CURRENT_DATE-8, CURRENT_DATE-2, CURRENT_DATE-2),

-- 27: In Transit — Tallinn → Singapore (at Frankfurt)
('NC4867293150','In Transit','Express Delivery','1.6 kg','26 × 19 × 11 cm','Hardware Wallets',
 'CryptoGear','Tallinn','Estonia','BlockChain Labs','Singapore','Singapore',
 'Tallinn, Estonia','Singapore','Frankfurt Hub',
 59.4370,24.7536, 1.3521,103.8198, 50.1109,8.6821,
 CURRENT_DATE-2, CURRENT_DATE+2, NULL),

-- 28: Delivered — Paris → Lyon
('NC1078364592','Delivered','Same-Day Delivery','4.2 kg','45 × 35 × 25 cm','Prescription Medication',
 'PharmQuick','Paris','France','Lena Rousseau','Lyon','France',
 'Paris, France','Lyon, France','Lyon, France',
 48.8566,2.3522, 45.7640,4.8357, 45.7640,4.8357,
 CURRENT_DATE, CURRENT_DATE, CURRENT_DATE),

-- 29: Pending — Barcelona → Accra
('NC6592047381','Pending','Economy Shipping','18.4 kg','90 × 65 × 55 cm','Garden Tools & Seeds',
 'EcoGarden Ltd.','Barcelona','Spain','Green Spaces NGO','Accra','Ghana',
 'Barcelona, Spain','Accra, Ghana','Barcelona, Spain',
 41.3851,2.1734, 5.6037,-0.1870, 41.3851,2.1734,
 CURRENT_DATE, CURRENT_DATE+12, NULL),

-- 30: In Transit — Geneva → Hong Kong (at Dubai airport)
('NC3715928064','In Transit','International Air','5.1 kg','48 × 36 × 24 cm','Luxury Watches',
 'Swiss Precision AG','Geneva','Switzerland','Time Boutique','Hong Kong','China',
 'Geneva, Switzerland','Hong Kong','Dubai International Airport',
 46.2044,6.1432, 22.3193,114.1694, 25.2532,55.3657,
 CURRENT_DATE-4, CURRENT_DATE+1, NULL),

-- 31: Delayed — Johannesburg → Rotterdam (at Port of Cape Town)
('NC8903746215','Delayed','Freight Services','320 kg','250 × 180 × 150 cm','Agricultural Products',
 'Agri Exports SA','Johannesburg','South Africa','EU Food Imports','Rotterdam','Netherlands',
 'Johannesburg, South Africa','Rotterdam, Netherlands','Port of Cape Town',
 -26.2041,28.0473, 51.9244,4.4777, -33.9005,18.4246,
 CURRENT_DATE-10, CURRENT_DATE+7, NULL),

-- 32: Delivered — Seoul → Los Angeles
('NC2164839057','Delivered','Express Delivery','1.3 kg','24 × 18 × 9 cm','K-Pop Merchandise',
 'Seoul Studios','Seoul','South Korea','Pop Culture Shop','Los Angeles','United States',
 'Seoul, South Korea','Los Angeles, USA','Los Angeles, USA',
 37.5665,126.9780, 34.0522,-118.2437, 34.0522,-118.2437,
 CURRENT_DATE-6, CURRENT_DATE-1, CURRENT_DATE-1),

-- 33: Processing — Lima → Toronto
('NC9481703265','Processing','Standard Shipping','7.8 kg','60 × 45 × 35 cm','Handmade Crafts',
 'Andes Crafts','Lima','Peru','World Bazaar','Toronto','Canada',
 'Lima, Peru','Toronto, Canada','Lima Export Hub',
 -12.0464,-77.0428, 43.6532,-79.3832, -12.0464,-77.0428,
 CURRENT_DATE-1, CURRENT_DATE+9, NULL),

-- 34: Out for Delivery — Stockholm → Copenhagen
('NC5720394861','Out for Delivery','Express Delivery','2.5 kg','33 × 24 × 16 cm','Premium Coffee Beans',
 'Nordic Coffee Co.','Stockholm','Sweden','Café Aroma','Copenhagen','Denmark',
 'Stockholm, Sweden','Copenhagen, Denmark','Copenhagen Central Depot',
 59.3293,18.0686, 55.6761,12.5683, 55.6800,12.5700,
 CURRENT_DATE-2, CURRENT_DATE, NULL),

-- 35: In Transit — Houston → Cologne (at JFK)
('NC0638271549','In Transit','International Air','6.6 kg','52 × 40 × 28 cm','Scientific Equipment',
 'NASA Supplier Inc.','Houston','United States','ESA Research Lab','Cologne','Germany',
 'Houston, USA','Cologne, Germany','JFK International Hub',
 29.7604,-95.3698, 50.9333,6.9500, 40.6413,-73.7781,
 CURRENT_DATE-2, CURRENT_DATE+1, NULL);

-- ── 7. Seed Timeline Events ───────────────────────────────────

-- Helper: Insert timeline events per shipment
-- Each shipment gets events matching its status

-- NC7841203648 (Delivered)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC7841203648')
INSERT INTO timeline_events (shipment_id, status, description, location, lat, lng, event_date, completed, is_alert, sort_order)
SELECT s.id, ev.status, ev.description, ev.location, ev.lat, ev.lng, ev.event_date, ev.completed, ev.is_alert, ev.sort_order
FROM s, (VALUES
  ('Order Received','Shipment booked at Shenzhen, China facility','Shenzhen, China',22.5431,114.0579,TO_CHAR(CURRENT_DATE-7,'Mon DD, YYYY')||' 09:14 AM',true,false,1),
  ('Package Picked Up','Package collected from sender and processed','Shenzhen, China',22.5431,114.0579,TO_CHAR(CURRENT_DATE-6,'Mon DD, YYYY')||' 02:30 PM',true,false,2),
  ('In Transit','Package cleared customs — en route to hub','International Hub, Dubai',25.2532,55.3657,TO_CHAR(CURRENT_DATE-5,'Mon DD, YYYY')||' 11:05 AM',true,false,3),
  ('Arrived at Hub','Package arrived at London distribution center','London, UK',51.5074,-0.1278,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 07:45 AM',true,false,4),
  ('Out for Delivery','Package loaded onto delivery vehicle','London, UK',51.5074,-0.1278,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 08:20 AM',true,false,5),
  ('Delivered','Package successfully delivered to recipient','London, UK',51.5074,-0.1278,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 01:37 PM',true,false,6)
) AS ev(status,description,location,lat,lng,event_date,completed,is_alert,sort_order);

-- NC5293817402 (In Transit — at Dubai)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC5293817402')
INSERT INTO timeline_events (shipment_id, status, description, location, lat, lng, event_date, completed, is_alert, sort_order)
SELECT s.id, ev.status, ev.description, ev.location, ev.lat, ev.lng, ev.event_date, ev.completed, ev.is_alert, ev.sort_order
FROM s, (VALUES
  ('Order Received','Shipment booked at Frankfurt, Germany facility','Frankfurt, Germany',50.1109,8.6821,TO_CHAR(CURRENT_DATE-3,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Package collected and processed at sorting hub','Frankfurt, Germany',50.1109,8.6821,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 02:00 PM',true,false,2),
  ('In Transit','Package cleared export customs — airborne','International Hub, Dubai',25.2532,55.3657,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 06:30 AM',true,false,3),
  ('Arrived at Hub','Transiting Dubai International — connecting flight scheduled','Dubai International Airport',25.2532,55.3657,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 03:15 PM',true,false,4)
) AS ev(status,description,location,lat,lng,event_date,completed,is_alert,sort_order);

-- NC1047382915 (Out for Delivery — Amsterdam)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC1047382915')
INSERT INTO timeline_events (shipment_id, status, description, location, lat, lng, event_date, completed, is_alert, sort_order)
SELECT s.id, ev.status, ev.description, ev.location, ev.lat, ev.lng, ev.event_date, ev.completed, ev.is_alert, ev.sort_order
FROM s, (VALUES
  ('Order Received','Same-day order received at 10:02 AM','Amsterdam, Netherlands',52.3676,4.9041,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 10:02 AM',true,false,1),
  ('Package Picked Up','Courier collected package from Bloom Botanics','Amsterdam, Netherlands',52.3676,4.9041,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 11:45 AM',true,false,2),
  ('Out for Delivery','Package loaded onto delivery vehicle — Zone 4','Delivery Vehicle — Zone 4',52.3800,4.9200,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 08:20 AM',true,false,3),
  ('Delivered','Delivered',NULL,NULL,NULL,'Pending',false,false,4)
) AS ev(status,description,location,lat,lng,event_date,completed,is_alert,sort_order);

-- NC9384720561 (Pending — Warsaw)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC9384720561')
INSERT INTO timeline_events (shipment_id, status, description, location, lat, lng, event_date, completed, is_alert, sort_order)
SELECT s.id, ev.status, ev.description, ev.location, ev.lat, ev.lng, ev.event_date, ev.completed, ev.is_alert, ev.sort_order
FROM s, (VALUES
  ('Order Received','Shipment booked — awaiting collection','Warsaw, Poland',52.2297,21.0122,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 14:30 PM',true,false,1),
  ('Package Picked Up','Awaiting courier pickup','Warsaw, Poland',52.2297,21.0122,'Pending',false,false,2),
  ('In Transit','En route','NULL',NULL,NULL,'Pending',false,false,3),
  ('Delivered','Delivered',NULL,NULL,NULL,'Pending',false,false,4)
) AS ev(status,description,location,lat,lng,event_date,completed,is_alert,sort_order);

-- NC3827461092 (Delayed — Buffalo)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC3827461092')
INSERT INTO timeline_events (shipment_id, status, description, location, lat, lng, event_date, completed, is_alert, sort_order)
SELECT s.id, ev.status, ev.description, ev.location, ev.lat, ev.lng, ev.event_date, ev.completed, ev.is_alert, ev.sort_order
FROM s, (VALUES
  ('Order Received','Shipment booked at Toronto, Canada facility','Toronto, Canada',43.6532,-79.3832,TO_CHAR(CURRENT_DATE-5,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Package collected and processed','Toronto, Canada',43.6532,-79.3832,TO_CHAR(CURRENT_DATE-4,'Mon DD, YYYY')||' 01:00 PM',true,false,2),
  ('In Transit','Package crossed US border — en route','Regional Depot, Buffalo',42.8865,-78.8784,TO_CHAR(CURRENT_DATE-3,'Mon DD, YYYY')||' 09:15 AM',true,false,3),
  ('Delivery Delayed','Delay due to severe weather conditions — rescheduled','Regional Depot, Buffalo',42.8865,-78.8784,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 03:00 PM',false,true,4)
) AS ev(status,description,location,lat,lng,event_date,completed,is_alert,sort_order);

-- NC6174839205 (Delivered — Lagos)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC6174839205')
INSERT INTO timeline_events (shipment_id, status, description, location, lat, lng, event_date, completed, is_alert, sort_order)
SELECT s.id, ev.status, ev.description, ev.location, ev.lat, ev.lng, ev.event_date, ev.completed, ev.is_alert, ev.sort_order
FROM s, (VALUES
  ('Order Received','Shipment booked at Paris, France facility','Paris, France',48.8566,2.3522,TO_CHAR(CURRENT_DATE-6,'Mon DD, YYYY')||' 11:00 AM',true,false,1),
  ('Package Picked Up','Collected by courier','Paris, France',48.8566,2.3522,TO_CHAR(CURRENT_DATE-5,'Mon DD, YYYY')||' 03:00 PM',true,false,2),
  ('In Transit','Airborne — Charles de Gaulle to Lagos','International Hub',25.2532,55.3657,TO_CHAR(CURRENT_DATE-4,'Mon DD, YYYY')||' 07:00 AM',true,false,3),
  ('Out for Delivery','Out for delivery in Lagos','Lagos, Nigeria',6.5244,3.3792,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 09:30 AM',true,false,4),
  ('Delivered','Package delivered to Amara Okonkwo','Lagos, Nigeria',6.5244,3.3792,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 02:15 PM',true,false,5)
) AS ev(status,description,location,lat,lng,event_date,completed,is_alert,sort_order);

-- NC8203947165 (Processing — Detroit)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC8203947165')
INSERT INTO timeline_events (shipment_id, status, description, location, lat, lng, event_date, completed, is_alert, sort_order)
SELECT s.id, ev.status, ev.description, ev.location, ev.lat, ev.lng, ev.event_date, ev.completed, ev.is_alert, ev.sort_order
FROM s, (VALUES
  ('Order Received','Freight booking confirmed — Detroit Terminal','Detroit, USA',42.3314,-83.0458,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 08:00 AM',true,false,1),
  ('Package Picked Up','Cargo collected and being palletised','Detroit Freight Terminal',42.3314,-83.0458,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 10:00 AM',true,false,2),
  ('In Transit','En route to departure port',NULL,NULL,NULL,'Pending',false,false,3)
) AS ev(status,description,location,lat,lng,event_date,completed,is_alert,sort_order);

-- NC4729381056 (In Transit — Singapore)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC4729381056')
INSERT INTO timeline_events (shipment_id, status, description, location, lat, lng, event_date, completed, is_alert, sort_order)
SELECT s.id, ev.status, ev.description, ev.location, ev.lat, ev.lng, ev.event_date, ev.completed, ev.is_alert, ev.sort_order
FROM s, (VALUES
  ('Order Received','Shipment booked at Tokyo, Japan','Tokyo, Japan',35.6762,139.6503,TO_CHAR(CURRENT_DATE-4,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Collected from SakuraTech warehouse','Tokyo, Japan',35.6762,139.6503,TO_CHAR(CURRENT_DATE-3,'Mon DD, YYYY')||' 11:00 AM',true,false,2),
  ('In Transit','Departed Narita Airport — bound for Singapore','Singapore International Hub',1.3644,103.9915,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 06:45 AM',true,false,3),
  ('Arrived at Hub','Arrived at Singapore Changi — connecting to Sydney','Singapore International Hub',1.3644,103.9915,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 02:30 PM',true,false,4)
) AS ev(status,description,location,lat,lng,event_date,completed,is_alert,sort_order);

-- NC0583726491 (Delivered — Cairo)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC0583726491')
INSERT INTO timeline_events (shipment_id, status, description, location, lat, lng, event_date, completed, is_alert, sort_order)
SELECT s.id, ev.status, ev.description, ev.location, ev.lat, ev.lng, ev.event_date, ev.completed, ev.is_alert, ev.sort_order
FROM s, (VALUES
  ('Order Received','Booked at New York','New York, USA',40.7128,-74.0060,TO_CHAR(CURRENT_DATE-9,'Mon DD, YYYY')||' 10:00 AM',true,false,1),
  ('Package Picked Up','Collected by BookWorld courier','New York, USA',40.7128,-74.0060,TO_CHAR(CURRENT_DATE-8,'Mon DD, YYYY')||' 02:00 PM',true,false,2),
  ('In Transit','Departed JFK — international freight','International Hub, Dubai',25.2532,55.3657,TO_CHAR(CURRENT_DATE-7,'Mon DD, YYYY')||' 11:00 PM',true,false,3),
  ('Arrived at Hub','Cleared Egyptian customs','Cairo, Egypt',30.0444,31.2357,TO_CHAR(CURRENT_DATE-4,'Mon DD, YYYY')||' 08:00 AM',true,false,4),
  ('Out for Delivery','Loaded onto local delivery vehicle','Cairo, Egypt',30.0444,31.2357,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 09:00 AM',true,false,5),
  ('Delivered','Delivered to Cairo University reception','Cairo, Egypt',30.0444,31.2357,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 11:45 AM',true,false,6)
) AS ev(status,description,location,lat,lng,event_date,completed,is_alert,sort_order);

-- NC7362819405 (Out for Delivery — Vienna)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC7362819405')
INSERT INTO timeline_events (shipment_id, status, description, location, lat, lng, event_date, completed, is_alert, sort_order)
SELECT s.id, ev.status, ev.description, ev.location, ev.lat, ev.lng, ev.event_date, ev.completed, ev.is_alert, ev.sort_order
FROM s, (VALUES
  ('Order Received','Booked at Zurich','Zurich, Switzerland',47.3769,8.5417,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 09:30 AM',true,false,1),
  ('Package Picked Up','Collected from Alpine Sports AG','Zurich, Switzerland',47.3769,8.5417,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 01:00 PM',true,false,2),
  ('In Transit','Road freight — Zurich to Vienna','Vienna, Austria',48.2082,16.3738,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 06:00 PM',true,false,3),
  ('Out for Delivery','Loaded onto Vienna delivery vehicle','Vienna Delivery Hub',48.2150,16.3800,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 08:00 AM',true,false,4)
) AS ev(status,description,location,lat,lng,event_date,completed,is_alert,sort_order);

-- NC2918374056 (In Transit — Mid-Atlantic)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC2918374056')
INSERT INTO timeline_events (shipment_id, status, description, location, lat, lng, event_date, completed, is_alert, sort_order)
SELECT s.id, ev.status, ev.description, ev.location, ev.lat, ev.lng, ev.event_date, ev.completed, ev.is_alert, ev.sort_order
FROM s, (VALUES
  ('Order Received','Freight booked — São Paulo port','São Paulo, Brazil',-23.5505,-46.6333,TO_CHAR(CURRENT_DATE-8,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Container loaded at Port of Santos','São Paulo, Brazil',-23.5505,-46.6333,TO_CHAR(CURRENT_DATE-7,'Mon DD, YYYY')||' 04:00 AM',true,false,2),
  ('In Transit','Vessel departed — crossing Atlantic','Mid-Atlantic Shipping Lane',20.0,-30.0,TO_CHAR(CURRENT_DATE-5,'Mon DD, YYYY')||' 12:00 PM',true,false,3)
) AS ev(status,description,location,lat,lng,event_date,completed,is_alert,sort_order);

-- NC5841729036 (Returned — Milan)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC5841729036')
INSERT INTO timeline_events (shipment_id, status, description, location, lat, lng, event_date, completed, is_alert, sort_order)
SELECT s.id, ev.status, ev.description, ev.location, ev.lat, ev.lng, ev.event_date, ev.completed, ev.is_alert, ev.sort_order
FROM s, (VALUES
  ('Order Received','Order booked — Milan','Milan, Italy',45.4642,9.1900,TO_CHAR(CURRENT_DATE-7,'Mon DD, YYYY')||' 10:00 AM',true,false,1),
  ('Package Picked Up','Collected from Online Boutique','Milan, Italy',45.4642,9.1900,TO_CHAR(CURRENT_DATE-6,'Mon DD, YYYY')||' 02:00 PM',true,false,2),
  ('In Transit','Shipped to Brussels','Brussels, Belgium',50.8503,4.3517,TO_CHAR(CURRENT_DATE-5,'Mon DD, YYYY')||' 08:00 AM',true,false,3),
  ('Return Initiated','Delivery failed — address not found. Package returned to sender','Brussels, Belgium',50.8503,4.3517,TO_CHAR(CURRENT_DATE-3,'Mon DD, YYYY')||' 10:15 AM',false,true,4)
) AS ev(status,description,location,lat,lng,event_date,completed,is_alert,sort_order);

-- NC3049182756 (Delivered — Dubai)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC3049182756')
INSERT INTO timeline_events (shipment_id, status, description, location, lat, lng, event_date, completed, is_alert, sort_order)
SELECT s.id, ev.status, ev.description, ev.location, ev.lat, ev.lng, ev.event_date, ev.completed, ev.is_alert, ev.sort_order
FROM s, (VALUES
  ('Order Received','Same-day order received','Dubai, UAE',25.2048,55.2708,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Collected from FreshMart warehouse','Dubai, UAE',25.2048,55.2708,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 10:30 AM',true,false,2),
  ('Out for Delivery','Courier en route','Dubai, UAE',25.2048,55.2708,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 11:15 AM',true,false,3),
  ('Delivered','Delivered to Khalid Al Rashidi','Dubai, UAE',25.2048,55.2708,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 12:45 PM',true,false,4)
) AS ev(status,description,location,lat,lng,event_date,completed,is_alert,sort_order);

-- NC8172039465 (In Transit — KL)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC8172039465')
INSERT INTO timeline_events (shipment_id, status, description, location, lat, lng, event_date, completed, is_alert, sort_order)
SELECT s.id, ev.status, ev.description, ev.location, ev.lat, ev.lng, ev.event_date, ev.completed, ev.is_alert, ev.sort_order
FROM s, (VALUES
  ('Order Received','Booked at Mumbai','Mumbai, India',19.0760,72.8777,TO_CHAR(CURRENT_DATE-3,'Mon DD, YYYY')||' 08:30 AM',true,false,1),
  ('Package Picked Up','Collected from Pharma Dynamics','Mumbai, India',19.0760,72.8777,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 01:00 PM',true,false,2),
  ('In Transit','Airborne via KLIA connecting hub','Kuala Lumpur Hub',3.1390,101.6869,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 05:00 AM',true,false,3),
  ('Arrived at Hub','Transiting Kuala Lumpur International — onward to Jakarta','Kuala Lumpur Hub',3.1390,101.6869,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 11:00 AM',true,false,4)
) AS ev(status,description,location,lat,lng,event_date,completed,is_alert,sort_order);

-- Bulk insert simpler events for remaining shipments
-- NC6394817502 (Processing — AMS)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC6394817502')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at Amsterdam HQ','Amsterdam, Netherlands',52.3676,4.9041,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Documents collected and processed','Amsterdam, Netherlands',52.3676,4.9041,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 10:00 AM',true,false,2),
  ('In Transit','Awaiting departure','Amsterdam, Netherlands',52.3676,4.9041,'Pending',false,false,3)
) AS ev(s,d,l,la,ln,dt,c,a,o);

-- NC7581930246 (Delivered — Stockholm)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC7581930246')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at Helsinki','Helsinki, Finland',60.1699,24.9384,TO_CHAR(CURRENT_DATE-5,'Mon DD, YYYY')||' 08:00 AM',true,false,1),
  ('Package Picked Up','Collected from CraftWood Studios','Helsinki, Finland',60.1699,24.9384,TO_CHAR(CURRENT_DATE-4,'Mon DD, YYYY')||' 11:00 AM',true,false,2),
  ('In Transit','Ferry + road transit via Helsinki–Stockholm','Stockholm, Sweden',59.3293,18.0686,TO_CHAR(CURRENT_DATE-3,'Mon DD, YYYY')||' 06:00 PM',true,false,3),
  ('Out for Delivery','Out for delivery in Stockholm','Stockholm, Sweden',59.3293,18.0686,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 09:00 AM',true,false,4),
  ('Delivered','Delivered to Interior Hub','Stockholm, Sweden',59.3293,18.0686,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 02:30 PM',true,false,5)
) AS ev(s,d,l,la,ln,dt,c,a,o);

-- NC2047391856 (Delayed — Heathrow customs)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC2047391856')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at Seoul','Seoul, South Korea',37.5665,126.9780,TO_CHAR(CURRENT_DATE-6,'Mon DD, YYYY')||' 10:00 AM',true,false,1),
  ('Package Picked Up','Collected from KoreanBeauty Co.','Seoul, South Korea',37.5665,126.9780,TO_CHAR(CURRENT_DATE-5,'Mon DD, YYYY')||' 03:00 PM',true,false,2),
  ('In Transit','Departed Incheon Airport — bound for London','International Hub',25.2532,55.3657,TO_CHAR(CURRENT_DATE-4,'Mon DD, YYYY')||' 11:00 PM',true,false,3),
  ('Arrived at Hub','Arrived at Heathrow — held for customs inspection','Customs Hold, Heathrow',51.4700,-0.4543,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 07:00 AM',true,false,4),
  ('Delivery Delayed','Additional documentation required by HMRC — working to resolve','Customs Hold, Heathrow',51.4700,-0.4543,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 09:00 AM',false,true,5)
) AS ev(s,d,l,la,ln,dt,c,a,o);

-- NC9283741650 (Out for Delivery — Rome)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC9283741650')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at Florence','Florence, Italy',43.7696,11.2558,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 11:00 AM',true,false,1),
  ('Package Picked Up','Collected from Artisan Jewels studio','Florence, Italy',43.7696,11.2558,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 03:00 PM',true,false,2),
  ('In Transit','Road transit Florence → Rome','Rome South Depot',41.8900,12.5000,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 07:00 AM',true,false,3),
  ('Out for Delivery','Package with Rome courier — estimated 2 hrs','Rome South Depot',41.8900,12.5000,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 09:30 AM',true,false,4)
) AS ev(s,d,l,la,ln,dt,c,a,o);

-- NC4816273059 (In Transit — Port of Durban)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC4816273059')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Freight booked at Guangzhou','Guangzhou, China',23.1291,113.2644,TO_CHAR(CURRENT_DATE-14,'Mon DD, YYYY')||' 08:00 AM',true,false,1),
  ('Package Picked Up','Container stuffed and sealed at factory','Guangzhou, China',23.1291,113.2644,TO_CHAR(CURRENT_DATE-13,'Mon DD, YYYY')||' 06:00 AM',true,false,2),
  ('In Transit','Vessel departed Guangzhou port','Port of Durban',-29.8587,31.0218,TO_CHAR(CURRENT_DATE-10,'Mon DD, YYYY')||' 10:00 AM',true,false,3),
  ('Arrived at Hub','Vessel arrived Port of Durban — customs clearance in progress','Port of Durban',-29.8587,31.0218,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 06:00 AM',true,false,4)
) AS ev(s,d,l,la,ln,dt,c,a,o);

-- NC1534892076 (Delivered — Chicago same-day)
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC1534892076')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Order placed online','Chicago, USA',41.8781,-87.6298,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 11:30 AM',true,false,1),
  ('Package Picked Up','Collected from Gourmet Kitchen','Chicago, USA',41.8781,-87.6298,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 12:15 PM',true,false,2),
  ('Out for Delivery','Courier en route','Chicago, USA',41.8781,-87.6298,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 12:45 PM',true,false,3),
  ('Delivered','Delivered to Rachel Monroe','Chicago, USA',41.8781,-87.6298,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 01:30 PM',true,false,4)
) AS ev(s,d,l,la,ln,dt,c,a,o);

-- Remaining shipments - compact inserts for Pending/Processing states
WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC6078341925')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at Munich, Germany','Munich, Germany',48.1351,11.5820,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 10:00 AM',true,false,1),
  ('Package Picked Up','Awaiting collection','Munich, Germany',48.1351,11.5820,'Pending',false,false,2)
) AS ev(s,d,l,la,ln,dt,c,a,o);

WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC3920184765')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at Vancouver','Vancouver, Canada',49.2827,-123.1207,TO_CHAR(CURRENT_DATE-3,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Collected from Maple Leaf Exports','Vancouver, Canada',49.2827,-123.1207,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 11:00 AM',true,false,2),
  ('In Transit','Airborne — Pacific crossing','Pacific Air Transit',42.0,-170.0,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 03:00 AM',true,false,3)
) AS ev(s,d,l,la,ln,dt,c,a,o);

WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC8451736290')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at London','London, UK',51.5074,-0.1278,TO_CHAR(CURRENT_DATE-12,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Collected from BookNest Publishers','London, UK',51.5074,-0.1278,TO_CHAR(CURRENT_DATE-11,'Mon DD, YYYY')||' 01:00 PM',true,false,2),
  ('In Transit','Economy air freight via Dubai hub','International Hub, Dubai',25.2532,55.3657,TO_CHAR(CURRENT_DATE-9,'Mon DD, YYYY')||' 07:00 AM',true,false,3),
  ('Arrived at Hub','Cleared Kenya customs — on last mile','Nairobi, Kenya',-1.2921,36.8219,TO_CHAR(CURRENT_DATE-5,'Mon DD, YYYY')||' 09:00 AM',true,false,4),
  ('Out for Delivery','Out for delivery','Nairobi, Kenya',-1.2921,36.8219,TO_CHAR(CURRENT_DATE-3,'Mon DD, YYYY')||' 08:00 AM',true,false,5),
  ('Delivered','Delivered to Nairobi Library','Nairobi, Kenya',-1.2921,36.8219,TO_CHAR(CURRENT_DATE-3,'Mon DD, YYYY')||' 11:00 AM',true,false,6)
) AS ev(s,d,l,la,ln,dt,c,a,o);

WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC0297465318')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Freight booked at Oslo','Oslo, Norway',59.9139,10.7522,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 08:00 AM',true,false,1),
  ('Package Picked Up','Timber loaded at Oslo Terminal','Oslo Freight Terminal',59.9139,10.7522,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 07:00 AM',true,false,2)
) AS ev(s,d,l,la,ln,dt,c,a,o);

WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC7134682905')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at San Francisco','San Francisco, USA',37.7749,-122.4194,TO_CHAR(CURRENT_DATE-3,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Collected from TechGadget US warehouse','San Francisco, USA',37.7749,-122.4194,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 02:00 PM',true,false,2),
  ('In Transit','Ground freight — I-5 North corridor','Seattle Distribution Center',47.6100,-122.3400,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 06:00 PM',true,false,3),
  ('Out for Delivery','Package with Seattle courier','Seattle Distribution Center',47.6100,-122.3400,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 08:30 AM',true,false,4)
) AS ev(s,d,l,la,ln,dt,c,a,o);

WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC5309182476')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at Delhi','Delhi, India',28.6139,77.2090,TO_CHAR(CURRENT_DATE-8,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Collected from Spice World India','Delhi, India',28.6139,77.2090,TO_CHAR(CURRENT_DATE-7,'Mon DD, YYYY')||' 02:00 PM',true,false,2),
  ('In Transit','Air freight — IGI Airport to JFK','International Hub, Dubai',25.2532,55.3657,TO_CHAR(CURRENT_DATE-6,'Mon DD, YYYY')||' 11:00 PM',true,false,3),
  ('Arrived at Hub','Cleared US customs at JFK','New York, USA',40.7128,-74.0060,TO_CHAR(CURRENT_DATE-4,'Mon DD, YYYY')||' 08:00 AM',true,false,4),
  ('Out for Delivery','Out for delivery in New York','New York, USA',40.7128,-74.0060,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 09:00 AM',true,false,5),
  ('Delivered','Delivered to Flavour House','New York, USA',40.7128,-74.0060,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 01:00 PM',true,false,6)
) AS ev(s,d,l,la,ln,dt,c,a,o);

WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC4867293150')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at Tallinn','Tallinn, Estonia',59.4370,24.7536,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 10:00 AM',true,false,1),
  ('Package Picked Up','Collected from CryptoGear','Tallinn, Estonia',59.4370,24.7536,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 01:00 PM',true,false,2),
  ('In Transit','Air freight connecting via Frankfurt Hub','Frankfurt Hub',50.1109,8.6821,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 06:00 AM',true,false,3)
) AS ev(s,d,l,la,ln,dt,c,a,o);

WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC1078364592')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Same-day order placed','Paris, France',48.8566,2.3522,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Collected from PharmQuick','Paris, France',48.8566,2.3522,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 10:30 AM',true,false,2),
  ('Out for Delivery','En route to Lyon via TGV courier','Lyon, France',45.7640,4.8357,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 11:00 AM',true,false,3),
  ('Delivered','Delivered to Lena Rousseau','Lyon, France',45.7640,4.8357,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 01:45 PM',true,false,4)
) AS ev(s,d,l,la,ln,dt,c,a,o);

WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC6592047381')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at Barcelona','Barcelona, Spain',41.3851,2.1734,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 11:00 AM',true,false,1),
  ('Package Picked Up','Awaiting collection','Barcelona, Spain',41.3851,2.1734,'Pending',false,false,2)
) AS ev(s,d,l,la,ln,dt,c,a,o);

WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC3715928064')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at Geneva','Geneva, Switzerland',46.2044,6.1432,TO_CHAR(CURRENT_DATE-4,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Collected — high-value handling protocol activated','Geneva, Switzerland',46.2044,6.1432,TO_CHAR(CURRENT_DATE-3,'Mon DD, YYYY')||' 11:00 AM',true,false,2),
  ('In Transit','Air freight via Dubai hub','Dubai International Airport',25.2532,55.3657,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 08:00 PM',true,false,3),
  ('Arrived at Hub','Transiting Dubai International','Dubai International Airport',25.2532,55.3657,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 06:00 AM',true,false,4)
) AS ev(s,d,l,la,ln,dt,c,a,o);

WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC8903746215')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Freight booked at Johannesburg','Johannesburg, South Africa',-26.2041,28.0473,TO_CHAR(CURRENT_DATE-10,'Mon DD, YYYY')||' 08:00 AM',true,false,1),
  ('Package Picked Up','Container loaded at OR Tambo depot','Johannesburg, South Africa',-26.2041,28.0473,TO_CHAR(CURRENT_DATE-9,'Mon DD, YYYY')||' 06:00 AM',true,false,2),
  ('In Transit','Vessel en route — Atlantic corridor','Port of Cape Town',-33.9005,18.4246,TO_CHAR(CURRENT_DATE-7,'Mon DD, YYYY')||' 12:00 PM',true,false,3),
  ('Delivery Delayed','Port congestion at Cape Town — rerouting to next available vessel','Port of Cape Town',-33.9005,18.4246,TO_CHAR(CURRENT_DATE-3,'Mon DD, YYYY')||' 09:00 AM',false,true,4)
) AS ev(s,d,l,la,ln,dt,c,a,o);

WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC2164839057')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at Seoul','Seoul, South Korea',37.5665,126.9780,TO_CHAR(CURRENT_DATE-6,'Mon DD, YYYY')||' 10:00 AM',true,false,1),
  ('Package Picked Up','Collected from Seoul Studios','Seoul, South Korea',37.5665,126.9780,TO_CHAR(CURRENT_DATE-5,'Mon DD, YYYY')||' 02:00 PM',true,false,2),
  ('In Transit','Air freight — Incheon to LAX','Los Angeles, USA',34.0522,-118.2437,TO_CHAR(CURRENT_DATE-4,'Mon DD, YYYY')||' 11:00 PM',true,false,3),
  ('Arrived at Hub','Cleared US customs at LAX','Los Angeles, USA',34.0522,-118.2437,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 07:00 AM',true,false,4),
  ('Out for Delivery','With local courier','Los Angeles, USA',34.0522,-118.2437,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 09:00 AM',true,false,5),
  ('Delivered','Delivered to Pop Culture Shop','Los Angeles, USA',34.0522,-118.2437,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 12:00 PM',true,false,6)
) AS ev(s,d,l,la,ln,dt,c,a,o);

WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC9481703265')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at Lima','Lima, Peru',-12.0464,-77.0428,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Being processed at Lima Export Hub','Lima Export Hub',-12.0464,-77.0428,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 10:00 AM',true,false,2)
) AS ev(s,d,l,la,ln,dt,c,a,o);

WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC5720394861')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at Stockholm','Stockholm, Sweden',59.3293,18.0686,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Collected from Nordic Coffee Co.','Stockholm, Sweden',59.3293,18.0686,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 02:00 PM',true,false,2),
  ('In Transit','Express road freight Stockholm → Copenhagen','Copenhagen Central Depot',55.6800,12.5700,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 10:00 PM',true,false,3),
  ('Out for Delivery','Out for delivery — Copenhagen','Copenhagen Central Depot',55.6800,12.5700,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 08:00 AM',true,false,4)
) AS ev(s,d,l,la,ln,dt,c,a,o);

WITH s AS (SELECT id FROM shipments WHERE tracking_number='NC0638271549')
INSERT INTO timeline_events (shipment_id,status,description,location,lat,lng,event_date,completed,is_alert,sort_order)
SELECT s.id,ev.s,ev.d,ev.l,ev.la,ev.ln,ev.dt,ev.c,ev.a,ev.o FROM s,(VALUES
  ('Order Received','Booked at Houston','Houston, USA',29.7604,-95.3698,TO_CHAR(CURRENT_DATE-2,'Mon DD, YYYY')||' 09:00 AM',true,false,1),
  ('Package Picked Up','Collected from NASA Supplier facility','Houston, USA',29.7604,-95.3698,TO_CHAR(CURRENT_DATE-1,'Mon DD, YYYY')||' 01:00 PM',true,false,2),
  ('In Transit','Connecting via JFK International Hub','JFK International Hub',40.6413,-73.7781,TO_CHAR(CURRENT_DATE,'Mon DD, YYYY')||' 06:30 AM',true,false,3)
) AS ev(s,d,l,la,ln,dt,c,a,o);

-- ── 8. Useful queries for the application ─────────────────────

-- Get shipment with all timeline events (used by tracking page):
-- SELECT s.*, json_agg(t ORDER BY t.sort_order) AS timeline
-- FROM shipments s
-- LEFT JOIN timeline_events t ON t.shipment_id = s.id
-- WHERE s.tracking_number = 'NC7841203648'
-- GROUP BY s.id;

-- Dashboard stats:
-- SELECT status, COUNT(*) FROM shipments GROUP BY status;

-- Dashboard search:
-- SELECT * FROM shipments
-- WHERE tracking_number ILIKE '%NC78%'
--    OR sender_name ILIKE '%apex%'
--    OR destination ILIKE '%london%'
-- ORDER BY created_at DESC;

-- ── Done! ──────────────────────────────────────────────────────
-- Set your environment variables in .env.local:
--   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
--   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
