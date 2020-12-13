
import re
import json
import pandas as pd
from datetime import datetime
from selenium import webdriver
import time

with open('ca_wildfire_clean.json', 'r', encoding="utf-8") as f:
    data = json.load(f)
df2 = pd.DataFrame(data)

with open('ca_wildfire_2.json', 'r', encoding="utf-8") as f:
    data = json.load(f)
df = pd.DataFrame(data)
df['geo_loc'] = df.apply(lambda row: "", axis=1)

for index, i in df2.iterrows():
    if i["Latitude"] == 0:
        df.at[index, 'geo_loc'] = "google"
    else:
        df.at[index, 'geo_loc'] = "original"


# driver = webdriver.Chrome()
# url = "https://www.google.dk/maps/place/"
# driver.get(url)
# time.sleep(3)

pattern = re.compile('/@(.*?)/')
# url ="https://www.google.dk/maps/place/Little+Yosemite+Valley/@37.7263134,-119.5451701,14z/data=!3m1!4b1!4m5!3m4!1s0x8096f3760efc7ed9:0x50bade8fe512c8d!8m2!3d37.7263152!4d-119.5276605"
# data = pattern.search(url)
# print(data.groups()[0].split(",")[0:2])
keyword = {
    "Mendocino National Forest Lightning Complex": {"lat": 39.60326787046863, "lon": -122.82754340218322},
    "Lincoln Fire": {"lat": 34.029778389588365, "lon": -118.05365116602638},
    "Fiddler Fire": {"lat": 40.39267283482457, "lon": -122.73512096615427},
    "Walker Fire": {"lat": 35.4150354643291, "lon": -118.48984636151958},

    "Web Fire": {"Forest Ranch, CA"},
    "River Complex": "Yolla Bolly-Middle Eel Wilderness",
    # "Mendocino National Forest Lightning Complex": "Mendocino National Forest",
    # "Lincoln Fire": "whittier narrows park near Montebello, CA, USA",
    "Antelope Fire": "Antelope Canyon, California, USA",
    # "Fiddler Fire": "Fiddler Rd, Shasta County, CA",
    # "Walker Fire": "Jacobs Road,community of Caliente, CA",
}

for index, i in df.iterrows():
    if i['Longitude'] >0:
        print(i["Name"], i["Latitude"], i["Longitude"])
        # try:
        #     df.at[index, "Latitude"] = keyword[i["Name"]]["lat"]
        #     df.at[index, "Longitude"] = keyword[i["Name"]]["lon"]
        # except:
        #     pass
        continue
        # try:
        #     driver.get(url + keyword[i["Name"]])
        #     time.sleep(5)
        #     print(driver.current_url+'/')
        #     data = pattern.search(driver.current_url+'/')
        #     lat, lon = data.groups()[0].split(",")[0:2]
        #     df.at[index, "Latitude"] = float(lat)
        #     df.at[index, "Longitude"] = float(lon)
        # except:
        #     pass

        # # df.at[index, 'geo_loc'] = "google maps"
        key_words = i["SearchKeywords"].split(",")
        for k in key_words:
            k = k.replace(" ", "+")
            search = url + k + ",+CA"
            driver.get(search)
            time.sleep(5)
            # print(driver.current_url+'/')
            p = False
            while True:
                try:
                    print(driver.current_url+'/')
                    data = pattern.search(driver.current_url+'/')
                    lat, lon = data.groups()[0].split(",")[0:2]
                    if float(lat) != 55.6498944:
                        df.at[index, "Latitude"] = float(lat)
                        df.at[index, "Longitude"] = float(lon)
                        print(lat, lon, driver.current_url)
                        p = True
                    break
                except:
                    time.sleep(2)
            if p:
                break

    #     text = i["Location"].replace(" ","+")
    #     search = url + text
    #     # print(search)
    #     driver.get(search)
    #     time.sleep(4)
    #     print(driver.current_url+'/')
    #     data = pattern.search(driver.current_url+'/')
    #     lat, lon = data.groups()[0].split(",")[0:2]
        # df["Latitude"][index] = float(lat)
        # df["Longitude"][index] = float(lon)

        # print(lat, lon)

    # else:
    #     df.at[index, 'geo_loc'] = "original"
# print(count)
# last_time unit: ms
res = df.to_json(orient="records")
data = json.loads(res)
with open('ca_wildfire_2.json', 'w', encoding="utf-8") as outfile:
    json.dump(data, outfile, sort_keys=True, indent=4,
              separators=(',', ':'), ensure_ascii=False)
# driver.close()