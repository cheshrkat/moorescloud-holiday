import json
import requests
import sys

if len(sys.argv) > 1:
    command = sys.argv[1]
else:
    print "Usage: holiday.py [on|off|hash 123456]"
    exit()

if command == 'on':
    colour = "ffffff"
elif command == 'off':
    colour = "000000"
elif command == 'hash':
    colour = sys.argv[2]  

lights = []
for i in range(50):
    lights.append("#" + colour)    

data_json = json.dumps({"lights": lights})

r = requests.put('http://enlightenment/iotas/0.1/device/moorescloud.holiday/localhost/setlights', data=data_json)
