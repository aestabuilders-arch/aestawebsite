-- Seed: 17 cities from AESTA master plan §3.2
-- Applied to hosted project rcbhsakwfdwjheorxmzk via Supabase MCP (mcp__supabase__execute_sql).
-- This file is a records-only source of truth; for fresh DB bootstraps, run this via MCP execute_sql.

insert into public.cities (slug, name, name_ta, tier, district, nearby_cities, geo_lat, geo_lng) values
  ('pudukkottai',      'Pudukkottai',      'புதுக்கோட்டை',    1, 'Pudukkottai',     array['keeranur','thirumayam','alangudi','viralimalai','gandarvakottai'], 10.3833, 78.8001),
  ('karaikudi',        'Karaikudi',        'காரைக்குடி',       1, 'Sivaganga',        array['devakottai','sivaganga'],                                          10.0667, 78.7833),
  ('aranthangi',       'Aranthangi',       'அறந்தாங்கி',       1, 'Pudukkottai',     array['avudaiyarkoil','ponnamaravathy','thirumayam'],                     10.1667, 78.9833),
  ('trichy',           'Tiruchirappalli',  'திருச்சிராப்பள்ளி', 1, 'Tiruchirappalli', array['thanjavur','viralimalai'],                                          10.7905, 78.7047),
  ('thanjavur',        'Thanjavur',        'தஞ்சாவூர்',         1, 'Thanjavur',       array['trichy'],                                                           10.7870, 79.1378),
  ('keeranur',         'Keeranur',         'கீரனூர்',           2, 'Pudukkottai',     array['pudukkottai','alangudi'],                                           10.4500, 78.8167),
  ('thirumayam',       'Thirumayam',       'திருமயம்',          2, 'Pudukkottai',     array['pudukkottai','aranthangi','ponnamaravathy'],                        10.2333, 78.7667),
  ('thirupathur',      'Thirupathur',      'திருப்பத்தூர்',    2, 'Sivaganga',        array['karaikudi','sivaganga'],                                            10.2000, 78.5667),
  ('ponnamaravathy',   'Ponnamaravathy',   'பொன்னமராவதி',      2, 'Pudukkottai',     array['thirumayam','aranthangi'],                                          10.2833, 78.9167),
  ('viralimalai',      'Viralimalai',      'விராலிமலை',         2, 'Pudukkottai',     array['pudukkottai','trichy'],                                             10.6000, 78.5500),
  ('alangudi',         'Alangudi',         'ஆலங்குடி',          2, 'Pudukkottai',     array['pudukkottai','keeranur'],                                           10.3667, 78.9833),
  ('illuppur',         'Illuppur',         'இலுப்பூர்',         2, 'Pudukkottai',     array['pudukkottai','viralimalai'],                                        10.5167, 78.6167),
  ('gandarvakottai',   'Gandarvakottai',   'கந்தர்வக்கோட்டை',  2, 'Pudukkottai',     array['pudukkottai'],                                                      10.5500, 78.8833),
  ('avudaiyarkoil',    'Avudaiyarkoil',    'அவுடையார்கோவில்',  2, 'Pudukkottai',     array['aranthangi'],                                                       10.0333, 79.0000),
  ('sivaganga',        'Sivaganga',        'சிவகங்கை',          2, 'Sivaganga',        array['karaikudi','thirupathur'],                                          9.8433,  78.4809),
  ('devakottai',       'Devakottai',       'தேவகோட்டை',         2, 'Sivaganga',        array['karaikudi'],                                                        9.9500,  78.8167),
  ('chennai',          'Chennai',          'சென்னை',             2, 'Chennai',          array[]::text[],                                                           13.0827, 80.2707);
