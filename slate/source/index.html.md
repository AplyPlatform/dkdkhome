---
title: DKDK Open API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - shell
  - php
  - javascript
  - python

toc_footers:
  - <div class="fb-like" data-href="https://www.facebook.com/386832955100142" data-width="100" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="false"></div>
  - <a href='http://dev.dkdk.io/'>DKDK 개발자홈</a>
  - <a href='http://facebook.com/dkdkheart'>DKDK 페이스북</a>
  - <a href='http://dkdk.io/'>DKDK 홈</a>
  - <a href='https://github.com/lord/slate'>Documentation Powered by Slate</a>
  - © 2019 <a href="http://aply.biz">APLY Inc.</a>
includes:
  - errors

search: true
---

# 소개

'오늘도 어제처럼 두근두근'

이곳은 두근두근 Open API 의 사용법을 설명해 드리는 곳입니다

# Token 발급 받기

> Open API 의 사용을 위해 DKDK 개발자 Token을 발급 받으세요.


```shell

```

```php

```

```javascript

```

```python

```


>

DKDK Open API는 DKDK 개발자 Token을 파라메터로 입력해야 사용하실 수 있습니다.
아래 경로에서 먼저 Token을 발급 받으세요.

[DKDK 개발자Token 발급](http://dev.dkdk.io/dev/register/index.html).

발급받은 Token의 사용방법은 각 Open API의 설명을 참고해 주세요.

<aside class="notice">
DKDK Open API를 사용하시려면 반드시 <code>Token</code>을 API의 파라메터로 입력해야 합니다. 간수에 유의해 주세요.
</aside>

# 드론의 현재위치 기록/읽기

## 드론의 현재위치 기록하기


```shell

curl -H "dkdk-token: DRONEPLAYTOKEN" -H "Content-type: application/json" -X POST -d '{"clientid":"EMAILADDRESS", "action":"set", "lat" : "12.134132", "lng" : "12.1324", "alt" : 5, "act" : "0", "missionname" : "TESTMISSION1", "missionid" : "mission-1"}' http://api.dkdk.io/v1/position

```

```php

$body['action'] = 'set';
$body['clientid'] = 'EMAILADDRESS';
$body['lat'] = "12.134132";
$body['lng'] = "12.1324";
$body['alt'] = 5;
$body['act'] = "0";
$body['missionid'] = "mission-1";
$body['missionname'] = "TESTMISSION1";

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DRONEPLAYTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v1/position');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "set", "clientid" : "EMAILADDRESS", "lat" : "12.134132", "lng" : "12.1324", "alt" : 5, "act" : "0", "missionid" : "mission-1", "missionname" : "TESTMISSION1"};

$.ajax({url : "https://api.dkdk.io/v1/position",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DRONEPLAYTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           alert("Successfully, recorded.");
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DRONEPLAYTOKEN'
}
data = {
    'action': 'set',
    'clientid' : 'EMAILADDRESS'
    'lat' : "12.134132",
    'lng' : "12.1324",
    'alt' : 5,
    "missionid" : "mission-1",
    "missionname" : "TESTMISSION1",
    "act" : "0"
}
url = 'https://api.dkdk.io/v1/position'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

현재의 좌표와 고도를 기록합니다.

### HTTP 요청

`POST http://apis.dkdk.io/v1/position`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 부여받은 개발자 Token값을 헤더에 입력합니다.
clientid | 개발자 Token을 받기위해 입력한 이메일 주소를 입력합니다.
action | 'set'을 입력합니다.
lat | latitude 좌표값를 입력합니다.
lng | longitude 좌표값를 입력합니다.
alt | 고도값을 입력합니다. (미터)
act | 해당위치에서 수행한 행동 (개발자 임의 정의 가능)
missionid | MISSION의 ID (미션 저장하기 참고 - Optional) 
missionname | MISSION의 이름 (미션 저장하기 참고 - Optional) 

<aside class="warning">
Token의 노출에 유의하세요!
</aside>

## 드론의 최근 위치 읽어오기


```shell

curl -H "dkdk-token: DRONEPLAYTOKEN" -H "Content-type: application/json" -X POST -d '{"clientid":"EMAILADDRESS", "action":"get", "start" : 1518534859144, "end" : 1518534861111}' http://api.dkdk.io/v1/position

```

```php

$body['action'] = 'get';
$body['clientid'] = 'EMAILADDRESS';
$body['start'] = 1518534859144;
$body['end'] = 1518534861111;

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DRONEPLAYTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v1/position');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;

```

```javascript


var jdata = {"action": "get", "clientid" : "EMAILADDRESS", "start" : 1518534859144, "end" : 1518534861111 };

$.ajax({url : "https://api.dkdk.io/v1/position",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DRONEPLAYTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           //r.data
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DRONEPLAYTOKEN'
}
data = {
    'action': 'get',
    'clientid' : 'EMAILADDRESS'
    'start' : 1518534859144,
    'end' : 1518534861111
}
url = 'https://api.dkdk.io/v1/position'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()


```
> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
{
  "result" : "success",
  "data" : [
   {
     "positiontime" : "Tue Feb 13 2018 15:44:40 GMT+0000 (UTC)",
     "dtimestamp" : 1518536680763,
     "lat" : "37.2435813",
     "lng" : "131.8661992",
     "alt" : 500,
     "act" : "0",
     "missionname" : "TESTMISSION1",
     "missionid" : "mission-1",
     "clientid" : "EMAILADDRESS"
   },
   {
     "positiontime" : "Tue Feb 13 2018 15:44:40 GMT+0000 (UTC)",
     "dtimestamp" : 1518536680765,
     "lat" : "37.2424227",
     "lng" : "131.8673264",
     "alt" : 500,
     "act" : "0",
     "missionname" : "TESTMISSION1",
     "missionid" : "mission-2",
     "clientid" : "EMAILADDRESS"
   },
   {
     "positiontime" : "Tue Feb 13 2018 15:44:40 GMT+0000 (UTC)",
     "dtimestamp" : 1518536680763,
     "lat" : "37.2421004",
     "lng" : "131.8680063",
     "alt" : 500,
     "act" : "0",
     "missionname" : "TESTMISSION1",
     "missionid" : "mission-3",
     "clientid" : "EMAILADDRESS"
   }
  ]
}

```

<aside class="warning">positiontime은 GMT+0 기준입니다. 서울기준이 아닙니다.</aside>
<aside class="warning">dtimestamp는 GMT+0 기준입니다. 서울기준이 아닙니다.</aside>

### HTTP 요청

`POST http://api.dkdk.io/v1/position`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 부여받은 개발자 Token값을 헤더에 입력합니다.
action | 'get'을 입력합니다.
clientid | 개발자 Token을 받기위해 입력한 이메일 주소를 입력합니다.
start (optional) | timestamp 값입니다. GMT+0 기준입니다. start ~ end 시각 사이의 결과를 요청할 때 사용합니다.
end (optional) | timestamp 값입니다. GMT+0 기준입니다.

# Mission 저장/불러오기

## Mission 저장


```shell

curl -H "dkdk-token: DRONEPLAYTOKEN" -H "Content-type: application/json" -X POST -d '{"clientid":"EMAILADDRESS", "action":"set", "mname" : MISSIONNAME, "missiondata" : [{"12.134132","12.1324",5,0,"mission-1"},{"12.134132","12.1324",5,0,"mission-2"}]}' http://api.dkdk.io/v1/mission

```

```php

$body['action'] = 'set';
$body['clientid'] = 'EMAILADDRESS';
$body['mname'] = "MISSIONNAME";
$body['missiondata'] = json_decode('[{"12.134132","12.1324",5,0},{"12.134132","12.1324",5,0,"mission-1"}]');

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DRONEPLAYTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v1/mission');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "set", "clientid" : "EMAILADDRESS", "mname" : "MISSIONNAME", "missiondata" : [{"12.134132","12.1324",5,0},{"12.134132","12.1324",5,0,"mission-1"}]};

$.ajax({url : "https://api.dkdk.io/v1/mission",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DRONEPLAYTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           //r.data;
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DRONEPLAYTOKEN'
}
data = {
    'action': 'set',
    'clientid' : 'EMAILADDRESS'
    "mname" : "MISSIONNAME",
    "missiondata" : [{"12.134132","12.1324",5,0},{"12.134132","12.1324",5,0,"mission-1"}]
}

url = 'https://api.dkdk.io/v1/mission'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result": "success"
  }
```

DKDK Mission Center에 Mission 데이터를 기록합니다.

### HTTP 요청

`POST http://apis.dkdk.io/v1/mission`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 부여받은 개발자 Token값을 헤더에 입력합니다.
clientid | 개발자 Token을 받기위해 입력한 이메일 주소를 입력합니다.
action | 'set'을 입력합니다.
mname | Mission 이름을 입력합니다.
missiondata | Mission 데이터 목록을 입력합니다.

#### missiondata 파라메터 포멧
[{latitude, longitude, altitude, action, mission-id}]

파라메터 | 설명
--------- | -----------
latitude | 위도
longitude | 경도
altitude | 고도 (미터)
action | 해당위치에서 드론이 수행할 행동 (개발자 임의입력 가능)
mission-id | Mission의 고유 아이디 (부여한 Mission 이름의 범위내에서 고유한 아이디, 개발자 임의입력 가능)


## Mission 불러오기


```shell

curl -H "dkdk-token: DRONEPLAYTOKEN" -H "Content-type: application/json" -X POST -d '{"clientid":"EMAILADDRESS", "action":"get"}' http://api.dkdk.io/v1/mission

```

```php

$body['action'] = 'get';
$body['clientid'] = 'EMAILADDRESS';

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DRONEPLAYTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v1/mission');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "get", "clientid" : "EMAILADDRESS"};

$.ajax({url : "https://api.dkdk.io/v1/mission",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DRONEPLAYTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           //r.data;
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DRONEPLAYTOKEN'
}
data = {
    'action': 'get',
    'clientid' : 'EMAILADDRESS'
}

url = 'https://api.dkdk.io/v1/mission'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result":"success",
    "data":[
      {"regtime":"Sun Dec 30 2018 13:11:39 GMT+0000 (UTC)",
        "mission":[{"alt":3,"lon":131.86471756082,"act":0,"id":"mission-1","lat":37.243835988516},{"alt":3,"lon":131.86645915266,"act":0,"id":"mission-2","lat":37.244423805175},{"alt":3,"lon":131.86671844684,"act":0,"id":"mission-3","lat":37.243568918929},{"alt":3,"lon":131.86493079644,"act":0,"id":"mission-4","lat":37.243182141771},{"alt":3,"lon":131.86491855886,"act":0,"id":"mission-5","lat":37.243758419995},{"alt":3,"lon":131.86492249835,"act":0,"id":"mission-6","lat":37.243906083699},{"alt":3,"lon":131.86492249835,"act":0,"id":"mission-7","lat":37.243903981846}],"name":"MISSIONNAME","clientid":"EMAILADDRESS"}]
      }
    ]
  }
```
DKDK Mission Center의 Mission 데이터를 불러옵니다.

### HTTP 요청

`POST http://apis.dkdk.io/v1/mission`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 부여받은 개발자 Token값을 헤더에 입력합니다.
clientid | 개발자 Token을 받기위해 입력한 이메일 주소를 입력합니다.
action | 'get'을 입력합니다.


## Mission 삭제하기


```shell

curl -H "dkdk-token: DRONEPLAYTOKEN" -H "Content-type: application/json" -X POST -d '{"clientid":"EMAILADDRESS", "action":"delete", "mname":"MISSIONNAME"}' http://api.dkdk.io/v1/mission

```

```php

$body['action'] = 'delete';
$body['clientid'] = 'EMAILADDRESS';
$body['mname'] = "MISSIONNAME";

$headers = array(
        'Content-Type: application/json',
        'dkdk-token: DRONEPLAYTOKEN'
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.dkdk.io/v1/mission');
curl_setopt($ch, CURLOPT_HTTPHEADER,  $headers);
curl_setopt($ch, CURLOPT_POST,    true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($body));
$response = curl_exec($ch);
//$json_list= json_decode($response, true);
curl_close($ch);

echo $response;


```

```javascript

var jdata = {"action": "delete", "clientid" : "EMAILADDRESS", "mname" : "MISSIONNAME"};

$.ajax({url : "https://api.dkdk.io/v1/mission",
       dataType : "json",
       contentType : "application/json",
       crossDomain: true,
       cache : false,
       data : JSON.stringify(jdata),
       type : "POST",
       async: false,
       beforeSend: function(request) {
          request.setRequestHeader("dkdk-token", "DRONEPLAYTOKEN");
        },
       success : function(r) {
         console.log(JSON.stringify(r));
         if(r.result == "success") {
           //r.data;
         }
       },
       error:function(request,status,error){
           alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
       }
});

```

```python

import requests
headers = {
    'Content-Type': 'application/json',
    'dkdk-token' : 'DRONEPLAYTOKEN'
}
data = {
    'action': 'delete',
    'clientid' : 'EMAILADDRESS',
    'mname' : 'MISSIONNAME'
}

url = 'https://api.dkdk.io/v1/mission'
response = requests.post(url, headers=headers,
                         data=json.dumps(data))
response.raise_for_status()
'response.json()

```

> 상기의 명령은 아래와 같이 JSON 구조로 응답합니다:

```json
  {
    "result":"success"
  }
```
DKDK Mission Center의 Mission 1개를 삭제합니다.

### HTTP 요청

`POST http://apis.dkdk.io/v1/mission`

### URL 파라메터

파라메터 | 설명
--------- | -----------
dkdk-token | 부여받은 개발자 Token값을 헤더에 입력합니다.
clientid | 개발자 Token을 받기위해 입력한 이메일 주소를 입력합니다.
action | 'delete' 입력합니다.
mname | 삭제할 Mission 이름을 입력합니다.
