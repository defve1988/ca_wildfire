import requests
from bs4 import BeautifulSoup
import json
import re

# https://www.fire.ca.gov/
year = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
url = "https://www.fire.ca.gov/incidents/"

fire_data = []
for y in year:
    res = requests.get(url+str(y))
    soup = BeautifulSoup(res.text, 'html.parser')
    pattern = re.compile('var incidentListTableInitialData = (.*?)];')
    scr = soup.find_all('script')

    for s in scr:
        ss = str(s.string).strip()
        data = pattern.match(ss)
        if data != None:
            res = json.loads(data.groups()[0]+"]")
            fire_data.extend(res)
            print(y, len(res))

with open('ca_wildfire.json', 'w', encoding='utf-8') as outfile:
    json.dump(fire_data, outfile, sort_keys=True, indent=4,
                separators=(',', ':'), ensure_ascii=False)
