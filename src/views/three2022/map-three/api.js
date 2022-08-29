export default {
  async getAllFactories(refresh = false) {
    const respone = {data: [{
      "code": "BJS",
      "name": "笔架山水厂",
      "businessCode": "FTBJS",
      "tenantId": "80a43d7f-0aa8-0f38-974a-39fe6e4c32fb",
      "threeDimensionalUrl": null,
      "bizType": 1,
      "sort": null,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "BIJIASHANSHUICHANG",
        "mapCoord": "114.074478,22.565829",
        "mapPolygonCoords": "114.074478,22.565829;114.031906,22.681182;113.943328,22.681182",
        "mapArea": "福田区",
        "flowChartConfig": "{\"data\":[\n  {\"id\":\"7bb20374-2c6f-47cf-9f3f-8bac93b0856f\",\"title\":\"工艺总图\"},\n  {\"id\":\"f3cc6c83-948d-4c29-a381-800431c83673\",\"title\":\"水厂参数\"},\n  {\n    \"title\":\"反应沉淀池\",\n    \"id\":\"menul1\",\n    \"children\":[\n  {\"id\":\"fb6051fa-d5e9-4d8e-86e2-bccaa4b85859\",\"title\":\"老厂反应沉淀池\"},\n  {\"id\":\"adcd6d64-530a-4dcb-bb9d-9885688af08c\",\"title\":\"新厂反应沉淀池\"},\n  {\"id\":\"6e19a30b-6bf0-4faa-bca1-5b5e569b93a3\",\"title\":\"预处理车间\"}\n      ]\n  },\n  {\n    \"title\":\"滤池\",\n    \"id\":\"menul2\",\n    \"children\":[\n  {\"id\":\"150760b9-4cdb-4e9a-90eb-236b393eb0d4\",\"title\":\"老厂V型滤池\"},\n  {\"id\":\"a845a2e1-122b-4882-9041-3a61d3a2a851\",\"title\":\"新厂V型滤池\"},\n  {\"id\":\"60b13123-5a26-4613-9f05-f7c0221f049a\",\"title\":\"普通快滤池\"}\n      ]\n  },\n  {\n    \"title\":\"清水池\",\n    \"id\":\"menul3\",\n    \"children\":[\n  {\"id\":\"4c71485f-070b-4c67-a485-4f83fa17454c\",\"title\":\"3#清水池\"},\n  {\"id\":\"0d844d7e-1b2e-4130-b92e-7a758b65c3d5\",\"title\":\"2#清水池\"}\n      ]\n  },\n  {\n    \"title\":\"送水泵房\",\n    \"id\":\"menul4\",\n    \"children\":[\n  {\"id\":\"e58295ec-7c50-4082-91ff-1930bd1830a9\",\"title\":\"老厂送水泵房\"},\n  {\"id\":\"39f7e90d-5f84-4aff-bb77-9f3bab0a1e2b\",\"title\":\"新厂送水泵房\"}\n      ]\n  },\n  {\n    \"title\":\"加药系统\",\n    \"id\":\"menul5\",\n    \"children\":[\n  {\"id\":\"7661dd65-41e4-49de-b1fb-0667d3e8f6ee\",\"title\":\"老厂石灰间\"},\n  {\"id\":\"6f0558a3-664f-4f1c-8c25-569b51a6d3bc\",\"title\":\"新厂石灰间\"},\n  {\"id\":\"10d2ed7b-e3be-4b90-a13c-338a1fe01712\",\"title\":\"石灰澄清系统\"},\n  {\"id\":\"6c987fde-606e-4cc2-ae40-2501300af229\",\"title\":\"碱铝投加间\"},\n  {\"id\":\"50bdd21b-e986-4211-8cee-6b53ec849887\",\"title\":\"次氯酸钠车间\"}\n      ]\n  },\n  {\n    \"title\":\"反冲洗系统\",\n    \"id\":\"menul6\",\n    \"children\":[\n  {\"id\":\"2c87ab81-14eb-4e43-b350-0ecb8409cbc8\",\"title\":\"反冲洗泵房\"},\n  {\"id\":\"6243829a-556c-440f-9cf1-e394e9bf9218\",\"title\":\"鼓风机房\"}\n      ]\n  },\n  {\n    \"title\":\"臭氧-生物活性炭滤池\",\n    \"id\":\"menul7\",\n    \"children\":[\n  {\"id\":\"0f4e99ee-7608-4c83-b157-81316b4efc25\",\"title\":\"液氧站\"},\n  {\"id\":\"5077486c-3d37-4708-b24a-99cd4481a967\",\"title\":\"臭氧间\"},\n  {\"id\":\"38259fc9-b82c-4bc5-ba7c-8f01650d1cbc\",\"title\":\"活性炭滤池\"}\n      ]\n  },\n  {\"id\":\"671e3f6c-5b2c-4e44-a517-5dbd8d3e64f6\",\"title\":\"回流水池\"},\n  {\n    \"title\":\"污泥脱水系统\",\n    \"id\":\"menul8\",\n    \"children\":[\n  {\"id\":\"34ac31c5-dd07-4be2-9c59-197514d38ed8\",\"title\":\"均衡池\"},\n  {\"id\":\"40f9b79f-b8d3-469e-9598-82bfb13ebf27\",\"title\":\"污泥提升泵房\"},\n  {\"id\":\"7babde23-c9ae-4e1c-a1d1-5431e4626390\",\"title\":\"浓缩池\"},\n  {\"id\":\"bf880c29-af86-409a-a024-0bca4369baca\",\"title\":\"脱水车间\"}\n      ]\n  }]}",
        "externalOrgCode": "s46"
      },
      "id": 1
    }, {
      "code": "YTS",
      "name": "盐田水质净化厂",
      "businessCode": "YTYTS",
      "tenantId": "32e955ca-37f0-cb39-bbf7-39f9dd66dc9d",
      "threeDimensionalUrl": null,
      "bizType": 2,
      "sort": 1,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "YANTIANSHUIZHIJINGHUACHANG",
        "mapCoord": "114.256668,22.570628",
        "mapPolygonCoords": "114.256668,22.570628;114.36630249023438,22.684984142872107;114.51736450195312,22.684984142872107",
        "mapArea": "盐田区",
        "flowChartConfig": "{\"data\":[{\"id\":\"5bb3e014-d2ab-4e40-a719-f7a94d124a64\",\"title\":\"工艺流程\"},{\"id\":\"ee70e301-5283-4dd3-ad04-aec245af892a\",\"title\":\"粗格栅\"},{\"id\":\"ea2e8945-913f-41fa-b05d-5d8988f41626\",\"title\":\"细格栅\"},{\"id\":\"a2057dcd-1100-41b4-81cc-bb4cbc150f87\",\"title\":\"鼓风机房\"},{\"id\":\"shengwuchi\",\"title\":\"生物池\",\"children\":[{\"id\":\"c152e0e3-9ae8-4402-bfab-0b0c9786176d\",\"title\":\"1#生物池\"},{\"id\":\"a5c64eb2-2df6-4162-b7b3-5334f5160fa1\",\"title\":\"2#生物池\"},{\"id\":\"91106d6b-5626-4ad4-aa4a-fa90d27654dd\",\"title\":\"3#生物池\"}]},{\"id\":\"977a4107-ac39-4d08-a592-a649ec740455\",\"title\":\"二沉池\"},{\"id\":\"79d76227-695e-4700-a37b-e30062ade8d6\",\"title\":\"高效沉淀池\"},{\"id\":\"6f47b949-aa61-4acd-9783-48df8bdfb789\",\"title\":\"次氯酸钠\"},{\"id\":\"6fb1739e-5aaf-491c-bf5e-097f61db407d\",\"title\":\"加药间\"},{\"id\":\"6a2aff72-e802-4069-858d-ccdb75f87751\",\"title\":\"紫外消毒\"},{\"id\":\"19d16acf-aff3-4dfc-85b0-e397e9842eda\",\"title\":\"中水系统\"},{\"id\":\"a3cc9723-b19d-45be-8e99-b23ca689b432\",\"title\":\"污泥车间\"},{\"id\":\"1f916fce-2e13-41fd-b96d-4ab4b83f9de7\",\"title\":\"排水泵站系统\"}]}",
        "externalOrgCode": "b3363"
      },
      "id": 2
    }, {
      "code": "ML",
      "name": "梅林水厂",
      "businessCode": "FTML",
      "tenantId": "80a43d7f-0aa8-0f38-974a-39fe6e4c32fb",
      "threeDimensionalUrl": null,
      "bizType": 1,
      "sort": null,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "MEILINSHUICHANG",
        "mapCoord": "114.030746,22.559527",
        "mapPolygonCoords": "114.030746,22.559527;114.10812377929688,22.653304181183618;114.21798706054688,22.653304181183618",
        "mapArea": "福田区",
        "flowChartConfig": "{\n  \"data\": [\n    {\n      \"id\": \"18cce3b6-7b22-4daa-aed8-83ea45079f43\",\n      \"title\": \"工艺总图\"\n    },\n    {\n    \"title\":\"沉淀池\",\n    \"id\":\"menul1\",\n    \"children\":[\n  {\"id\":\"e16adb14-4140-4d48-8ae6-f9f3a59a688b\",\"title\":\"沉淀池一期\"},\n  {\"id\":\"f0fcfe4a-eb8f-47c4-8db1-e3fff96810c2\",\"title\":\"沉淀池二期\"},\n  {\"id\":\"6e31bd7b-ddfc-4670-acb3-046ae230cfcc\",\"title\": \"回收水沉淀池\"}\n      ]\n  },\n  {\n    \"title\":\"加药间\",\n    \"id\":\"menul2\",\n    \"children\":[\n  {\"id\":\"c1f6daeb-7c18-4a56-9754-bba7c5ecd83f\",\"title\":\"次氯酸钠\"},\n  {\"id\":\"5eaac19a-133a-4fe1-bda0-20f2ea1b4adb\",\"title\":\"氢氧化钠\"},\n  {\"id\":\"d3528623-8f9d-4fa1-a3e1-a16cd6c253da\",\"title\": \"PAC投加\"}\n      ]\n  },\n  {\n    \"title\":\"滤池\",\n    \"id\":\"menul3\",\n    \"children\":[\n  {\"id\":\"9cbfb2a4-0df6-4d7a-bc42-562962288936\",\"title\":\"砂滤池\"},\n  {\"id\":\"a18d22f2-17b5-4770-8a29-7c54aa297012\",\"title\":\"砂滤池反冲泵房\"},\n  {\"id\":\"3101b207-3660-4de1-b39d-eb1177c5b563\",\"title\":\"碳滤池\"}\n      ]\n  },\n  {\n    \"title\":\"臭氧\",\n    \"id\":\"menul4\",\n    \"children\":[\n  {\"id\": \"e02d0af4-5a68-4726-9cc8-646ab389495a\",\"title\": \"臭氧发生间\"},\n  {\"id\": \"b01a49e0-052f-4a71-9ca9-40b258e6b19e\",\"title\": \"主臭氧池\"}\n      ]\n  },\n    \n    {\n      \"id\": \"b4aff1df-e7db-4e43-8f41-1726534200a9\",\n      \"title\": \"回收水泵井\"\n    },\n    {\n      \"id\": \"5d67282c-936d-490a-a8bc-451a22e54fce\",\n      \"title\": \"配水井\"\n    },\n    {\n      \"id\": \"668d04df-5820-4b6e-959f-1bd03ea71839\",\n      \"title\": \"清水池\"\n    },\n    {\n      \"id\": \"d3df7481-492b-4336-936b-766ea05a881f\",\n      \"title\": \"石灰间\"\n    },\n    {\n      \"id\": \"fbe288c6-4586-40ad-842d-120f43fd3f50\",\n      \"title\": \"送水泵房\"\n    },\n    {\n      \"id\": \"79a36097-8078-418d-9ec1-272671bae4bf\",\n      \"title\": \"提升泵房\"\n    },\n    {\n      \"id\": \"06f53fd9-1139-4fff-a596-70667a36773d\",\n      \"title\": \"格栅间\"\n    }\n  ]\n}",
        "externalOrgCode": "s48"
      },
      "id": 3
    }, {
      "code": "LF",
      "name": "罗芳水质净化厂",
      "businessCode": "LHLF",
      "tenantId": "10345868-194a-a2f6-2830-39f40ea2f376",
      "threeDimensionalUrl": null,
      "bizType": 2,
      "sort": 2,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "LUOFANGSHUIZHIJINGHUACHANG",
        "mapCoord": "114.155173,22.547402",
        "mapPolygonCoords": "114.155173,22.547402;114.25643920898438,22.701454830506705;114.38278198242188,22.701454830506705",
        "mapArea": "罗湖区",
        "flowChartConfig": "{\"data\":[{\"id\":\"27e3478a-26eb-4c6a-8307-70bc698425a1\",\"title\":\"工艺总图\"},\n{\n      \"title\": \"粗格栅\",\n      \"id\":\"menu1\",\n      \"children\":[\n          {\"id\":\"015268db-6348-4c49-a1d5-8b7ab0c03078\",\"title\":\"东粗格栅\"},\n          {\"id\":\"6ea319e4-87cf-47c4-b32c-b2c3b4f612d9\",\"title\":\"西粗格栅\"}\n      ]\n    },\n    {\"id\":\"ed75794d-69e0-4459-b136-f435589db814\",\"title\":\"细格栅\"},\n{\"id\":\"dccbd8e5-89d7-4022-9530-05e1ef0bccd0\",\"title\":\"速沉池\"},\n{\"id\":\"06df4a4c-9392-4cd0-a87c-e17aa711530a\",\"title\":\"精细格栅\"},\n{\n      \"title\": \"生化池\",\n      \"id\":\"menu2\",\n      \"children\":[\n         {\"id\":\"34d2d15c-54ee-46ef-8843-d20810b33bf6\",\"title\":\"1#生化池\"},\n          {\"id\":\"ef45ad3f-c63a-47a4-b17b-d5a60e1448ab\",\"title\":\"2#生化池\"},\n          {\"id\":\"ed0c396f-4acd-4ab0-bd4a-a5045723f53c\",\"title\":\"3#生化池\"},\n          {\"id\":\"f75d3b71-31eb-41af-84e8-8be152807562\",\"title\":\"4#生化池\"},\n          {\"id\":\"ffeec397-ab06-4ee7-b1f6-cd0a69ae87bf\",\"title\":\"生化池鼓风机\"}\n      ]\n    },\n{\n      \"title\": \"膜池\",\n      \"id\":\"menu3\",\n      \"children\":[\n         {\"id\":\"03bc68de-06f2-46ab-abfa-d61de0006062\",\"title\":\"1组膜池\"},\n         {\"id\":\"7b4ef0cf-4d3e-49c4-9865-eb4c7896595d\",\"title\":\"2组膜池\"},\n         {\"id\":\"d48f5c93-5e8b-4168-89f2-b17b8f6c934c\",\"title\":\"3组膜池\"},\n         {\"id\":\"5ab3988d-a132-4a91-aee3-5235ebf4533c\",\"title\":\"4组膜池\"},\n         {\"id\":\"941619f6-ed42-4853-bac6-d4e933156017\",\"title\":\"膜池鼓风机\"}\n      ]\n    },\n{\n      \"title\": \"加药间\",\n      \"id\":\"menu4\",\n      \"children\":[\n        {\"id\":\"9390f0a7-52a2-4a4e-a1e8-b393dde2e431\",\"title\":\"PAC加药间\"},\n        {\"id\":\"d1186bd3-10e6-4b97-87cc-243ede035b0f\",\"title\":\"次氯酸钠加药间\"},\n        {\"id\":\"62cc8416-ab6c-49b0-a786-835e82030baa\",\"title\":\"乙酸钠加药间\"}\n      ]\n    },\n{\"id\":\"8865b959-9d0b-4638-bd45-45685f8c3731\",\"title\":\"紫外消毒\"},\n{\n      \"title\": \"除臭\",\n      \"id\":\"menu5\",\n      \"children\":[\n        {\"id\":\"8fb80ee0-e26f-4615-8346-0933f7bab020\",\"title\":\"物理段除臭\"},\n        {\"id\":\"085f0155-ef25-4d48-98ad-8ce33c248da8\",\"title\":\"1#生化池除臭\"},\n        {\"id\":\"10633c8f-9017-41d4-abfb-052f70b0c58a\",\"title\":\"2#生化池除臭\"},\n        {\"id\":\"0070c6ab-1f10-4a3f-b347-ee0e940de749\",\"title\":\"3#生化池除臭\"},\n        {\"id\":\"40539f18-21d5-4fc7-8476-13b044768ae6\",\"title\":\"4#生化池除臭\"},\n        {\"id\":\"e29aa34c-90d7-41c4-8704-a2300d47959b\",\"title\":\"西区除臭\"}\n      ]\n    },\n{\"id\":\"7958b487-4eab-49b7-b011-e95a9aa77e9d\",\"title\":\"中水泵房\"},\n{\n      \"title\": \"污泥车间\",\n      \"id\":\"menu6\",\n      \"children\":[\n        {\"id\":\"92dc1525-4876-4085-a5db-45f95ce1d48a\",\"title\":\"污泥车间F1\"},\n        {\"id\":\"b0fafef1-cd22-4fe8-a6f1-28e465419f9b\",\"title\":\"污泥车间F234\"}\n      ]\n    }\n]}",
        "externalOrgCode": "s202"
      },
      "id": 4
    }, {
      "code": "DH",
      "name": "东湖水厂",
      "businessCode": "LHDH",
      "tenantId": "10345868-194a-a2f6-2830-39f40ea2f376",
      "threeDimensionalUrl": null,
      "bizType": 1,
      "sort": null,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "",
        "mapCoord": "",
        "mapPolygonCoords": "",
        "mapArea": "",
        "threeConfig": "",
        "externalOrgCode": "s47"
      },
      "id": 5
    }, {
      "code": "BHSZ",
      "name": "滨河水质净化厂",
      "businessCode": "BHSZ",
      "tenantId": "80a43d7f-0aa8-0f38-974a-39fe6e4c32fb",
      "threeDimensionalUrl": null,
      "bizType": 2,
      "sort": null,
      "extraProperties": {
        "isTrashSource": true,
        "mapSubTitle": "",
        "mapCoord": "",
        "mapPolygonCoords": "",
        "mapArea": "",
        "externalOrgCode": "s52"
      },
      "id": 6
    }, {
      "code": "NSDCAdmin",
      "name": "大涌水厂",
      "businessCode": "NSDCAdmin",
      "tenantId": "86cfd7c1-72f9-36da-6fe8-39fdaa8250cb",
      "threeDimensionalUrl": null,
      "bizType": 1,
      "sort": 3,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "",
        "mapCoord": "",
        "mapPolygonCoords": "",
        "mapArea": "",
        "flowChartConfig": "{\"data\":[\n  {\"id\":\"6fc582a9-ce96-45af-9882-38dcd302c065\",\"title\":\"工艺总图\"},\n    {\"id\":\"4da4c56f-e788-4a36-b0e8-e675e5f8e226\",\"title\":\"数据在线\"},\n  {\"id\":\"41cbba86-9801-4b4f-8a96-af8ccbcec34f\",\"title\":\"南滤池普通快滤池\"},\n  {\"id\":\"ae80eb12-691f-4900-b056-88fa81de6d08\",\"title\":\"北滤池\"},\n  {\"id\":\"46996769-15d1-4619-84ce-4900b9845f43\",\"title\":\"沉淀池\"},\n  {\"id\":\"98730eda-8733-41a3-9eaf-4ec8270aaf80\",\"title\":\"次氯酸钠投加\"},\n  {\"id\":\"06e7784e-3c38-47bb-9cb5-2301744169fd\",\"title\":\"石灰投加系统\"},\n  {\"id\":\"89c1b51b-0d4f-4b6b-89a9-874fdc34ac58\",\"title\":\"回收池行车\"},\n  {\"id\":\"b338982f-4c51-4b54-9fda-347e81704459\",\"title\":\"加药间碱铝投加\"},\n  {\"id\":\"6685a163-6365-4832-b62a-b87c067afaf9\",\"title\":\"南滤池总画面\"},\n  {\"id\":\"53b56d9c-0929-4c1b-a429-3a3d46fcdce6\",\"title\":\"南送水泵\"},\n  {\"id\":\"3a52d43a-d03d-4d3c-a4f1-b2b751f74db7\",\"title\":\"北送水泵\"},\n  {\"id\":\"ad2b93d3-083b-4813-9661-9d4dc5f94994\",\"title\":\"南泵房高压配电图\"},\n  {\"id\":\"e6723b5b-2e9d-40dd-b6c0-7ae2e9255bd3\",\"title\":\"北泵房高压配电图\"},\n  {\n    \"title\":\"1\",\n    \"id\":\"menu1\",\n    \"children\":[\n      {\"id\":\"6\",\"title\":\"1\"},\n      {\"id\":\"7\",\"title\":\"2钠\"}\n      ]\n  }\n  \n \n  \n  \n \n    \n    \n  \n    \n   \n    \n    \n    \n    \n    \n    \n  \n  ]}",
        "externalOrgCode": "s61"
      },
      "id": 7
    }, {
      "code": "NNSZ",
      "name": "南山水质净化厂",
      "businessCode": "NSSZ",
      "tenantId": "86cfd7c1-72f9-36da-6fe8-39fdaa8250cb",
      "threeDimensionalUrl": null,
      "bizType": 2,
      "sort": 1,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "NANSHANSHUIZHIJINGHUACHANG",
        "mapCoord": "113.907616,22.517918",
        "mapPolygonCoords": "",
        "mapArea": "南山区",
        "externalOrgCode": "s54"
      },
      "id": 8
    }, {
      "code": "STJ",
      "name": "沙头角水厂",
      "businessCode": "YTSTJ",
      "tenantId": "32e955ca-37f0-cb39-bbf7-39f9dd66dc9d",
      "threeDimensionalUrl": null,
      "bizType": 1,
      "sort": 3,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "SHATOUJIAOSHUICHANG",
        "mapCoord": "114.240961,22.562319",
        "mapPolygonCoords": "114.240961,22.562319;114.34158325195312,22.72172372713302;114.47479248046875,22.72172372713302",
        "mapArea": "盐田区",
        "externalOrgCode": "b3349"
      },
      "id": 10
    }, {
      "code": "YTG",
      "name": "盐田港水厂",
      "businessCode": "YTYTG",
      "tenantId": "32e955ca-37f0-cb39-bbf7-39f9dd66dc9d",
      "threeDimensionalUrl": "/3d-new?f=YTG",
      "bizType": 1,
      "sort": 2,
      "extraProperties": {
        "threeConfig": "{\r\n  \"key\": \"yantiangang\",\r\n  \"factoryId\": 11,\r\n  \"title\": \"水厂智慧平台\",\r\n  \"copyright\": \"Copyright(C) 深圳市水务科技有限公司\",\r\n  \"EQRunInterval\": 5000,\r\n  \"RTDataInterval\": 5000,\r\n  \"HACCPInterval\": 5000,\r\n  \"YTAddMedicineView\":\"80.5, 3.2, -104.0,82.87247,40,36.54673,60.04623\",\r\n  \"YTDemoCameraCode\":\"d20e09e88922405296b4ace9d47195a0\",\r\n  \"YTDemoCameraName\": \"矾花摄像头\",\r\n  \"YTDemoControlStopSconds\": 180,\r\n  \"controls\":{\r\n    \"CraftPanel\":false,\r\n    \"SafetyPanel.AccessControlRecord\":false,\r\n    \"ControlPanel\":true\r\n  },\r\n  \"modelInfo\": {\r\n    \"dataUrl\": \"/asset3d/yantiangang/Build/Build.data\",\r\n    \"frameworkUrl\": \"/asset3d/yantiangang/Build/Build.framework.js\",\r\n    \"codeUrl\": \"/asset3d/yantiangang/Build/Build.wasm\",\r\n    \"streamingAssetsUrl\": {\r\n       \"assetbundlespath\":\"/asset3d/yantiangang/AssetBundles/WebGL\",\r\n       \"defaultview\":\"-69.9, 3.2, -46.7,90.88891,40,57.76,95.87677\",\r\n       \"defaultfloor\":0\r\n    },\r\n    \"companyName\": \"DefaultCompany\",\r\n    \"productName\": \"NewHH\",\r\n    \"productVersion\": \"0.1\"\r\n  },\r\n  \"defaultFloor\": \"0\",\r\n  \"onlineFloorKeys\": [\"0\"],\r\n  \"floors\": [\r\n    {\r\n      \"label\": \"地面\",\r\n      \"value\": \"0\",\r\n      \"icon\": \"dimian\",\r\n      \"view\": \"-69.9, 3.2, -46.7,90.88891,40,57.76,95.87677\"\r\n    }\r\n  ],\r\n  \"pointnames\":[\r\n      \"鼓风机#1\",\r\n      \"鼓风机#2\",\r\n      \"进厂水质\",\r\n      \"出厂水质\",\r\n      \"精细格栅\",\r\n      \"南砂滤池\",\r\n      \"南沉淀池\",\r\n      \"北砂滤池\",\r\n      \"北沉淀池\",\r\n      \"回收水池\",\r\n      \"炭滤池\",\r\n      \"污泥调节池\",\r\n      \"反冲泵房\",\r\n      \"送水泵#1\",\r\n      \"送水泵#2\",\r\n      \"送水泵#3\",\r\n      \"送水泵#4\",\r\n      \"提升泵#1\",\r\n      \"提升泵#2\",\r\n      \"提升泵#3\",\r\n      \"臭氧发生器#1\",\r\n      \"臭氧发生器#2\"\r\n  ],\r\n  \"toolsOptions\": [\r\n    {\r\n      \"key\": \"Home\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ]\r\n    },\r\n    {\r\n      \"key\": \"View\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ]\r\n    },\r\n    {\r\n      \"key\": \"Reset\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ]\r\n    },\r\n    {\r\n      \"key\": \"RTData\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ],\r\n      \"initValue\": true\r\n    },\r\n    {\r\n      \"key\": \"Water\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ],\r\n      \"initValue\": true\r\n    },\r\n    {\r\n      \"key\": \"Ground\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ]\r\n    },\r\n    {\r\n      \"key\": \"Pipeline\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ],\r\n      \"options\": [\r\n        {\r\n          \"label\": \"原水管\",\r\n          \"value\": \"ProcessPipes\"\r\n        },\r\n        {\r\n          \"label\": \"药管\",\r\n          \"value\": \"ChemicalPipes\"\r\n        },\r\n        {\r\n          \"label\": \"自用水管\",\r\n          \"value\": \"CleanPipes\"\r\n        },\r\n        {\r\n          \"label\": \"雨水管\",\r\n          \"value\": \"RainPipes\"\r\n        },\r\n        {\r\n          \"label\": \"污水管\",\r\n          \"value\": \"WastePipes\"\r\n        },\r\n        {\r\n          \"label\": \"污泥管\",\r\n          \"value\": \"MudPipes\"\r\n        }\r\n      ]\r\n    }\r\n  ]\r\n}",
        "isTrashSource": false,
        "mapSubTitle": "YANTIANGANGSHUICHANG",
        "mapCoord": "114.257382,22.586079",
        "mapPolygonCoords": "114.257382,22.586079;114.14657592773438,22.71158965395831;114.01473999023438,22.71158965395831",
        "mapArea": "盐田区",
        "externalOrgCode": "b3355"
      },
      "id": 11
    }, {
      "code": "NNSC",
      "name": "南山水厂",
      "businessCode": "NS",
      "tenantId": "86cfd7c1-72f9-36da-6fe8-39fdaa8250cb",
      "threeDimensionalUrl": null,
      "bizType": 1,
      "sort": 2,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "",
        "mapCoord": "",
        "mapPolygonCoords": "",
        "mapArea": "",
        "externalOrgCode": "s62"
      },
      "id": 13
    }, {
      "code": "XLZS",
      "name": "西丽再生水厂",
      "businessCode": "XLZS",
      "tenantId": "86cfd7c1-72f9-36da-6fe8-39fdaa8250cb",
      "threeDimensionalUrl": null,
      "bizType": 2,
      "sort": 4,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "XILIZAISHENGSHUICHANG",
        "mapCoord": "113.966865,22.593197",
        "mapPolygonCoords": "",
        "mapArea": "南山区",
        "externalOrgCode": "s56",
        "threeConfig": "",
        "flowChartConfig": "{\"data\":[\n    {\"id\":\"2431228c-ae76-4150-868d-731436f69507\",\"title\":\"工艺总图\"}\n  ]}"
      },
      "id": 16
    }, {
      "code": "SKSZ",
      "name": "蛇口水质净化厂",
      "businessCode": "SKSZ",
      "tenantId": "86cfd7c1-72f9-36da-6fe8-39fdaa8250cb",
      "threeDimensionalUrl": null,
      "bizType": 2,
      "sort": 5,
      "extraProperties": {
        "flowChartConfig": "{\"data\":[\n  {\"id\":\"ee0386a7-f91b-4630-b47b-00da01b6b4a1\",\"title\":\"工艺流程\"},\n  {\"id\":\"91d29b7f-d73a-4f71-9946-13292fe9dffb\",\"title\":\"细格栅\"},\n  {\"id\":\"4893a3a0-7e74-4bd8-af48-d25db9574036\",\"title\":\"加药间二站\"},\n  {\"id\":\"26ca03b3-94bc-48f3-85d1-65babcc8aff7\",\"title\":\"脱水机房\"},\n  {\"id\":\"60d37e42-54fb-4602-b5f8-85622b3491fd\",\"title\":\"浓缩池\"},\n  {\"id\":\"1c621a1a-8b99-4d1f-997c-3f412a28d178\",\"title\":\"滤池\"},\n  {\"id\":\"b8b19b7a-f31f-408b-9c18-bdb7ae17c14a\",\"title\":\"加药间一站\"},\n  {\"id\":\"1cd39087-a3c0-4ae9-9d4a-f9168ab4eff8\",\"title\":\"加氯间\"},\n  {\"id\":\"0411232a-1113-430d-a2bb-5c13a5bd8d36\",\"title\":\"鼓风机房\"},\n  {\"id\":\"8bd697e6-b1c0-4967-a670-2c11a217379e\",\"title\":\"生化池\"}\n\n\n  \n    \n  \n  ]}",
        "isTrashSource": false,
        "mapSubTitle": "",
        "mapCoord": "",
        "mapPolygonCoords": "",
        "mapArea": "",
        "externalOrgCode": "s421"
      },
      "id": 17
    }, {
      "code": "FTSZ",
      "name": "福田水质净化厂",
      "businessCode": "FTSZ",
      "tenantId": "80a43d7f-0aa8-0f38-974a-39fe6e4c32fb",
      "threeDimensionalUrl": "/3d-new?f=FTSZ",
      "bizType": 2,
      "sort": 1,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "FUTIANSHUIZHIJINGHUACHANG",
        "mapCoord": "114.018971,22.53591",
        "mapPolygonCoords": "114.018971,22.53591;114.10812377929688,22.653304181183618;114.21798706054688,22.653304181183618",
        "mapArea": "福田区",
        "threeConfig": "{\r\n  \"key\": \"futian\",\r\n  \"factoryId\": 72,\r\n  \"title\": \"水厂智慧平台\",\r\n  \"copyright\": \"Copyright(C) 深圳市水务科技有限公司\",\r\n  \"RTDataInterval\": 10000,\r\n  \"controls\":{\r\n    \"CraftPanel\":false,\r\n    \"SafetyPanel.AccessControlRecord\":false\r\n  },\r\n  \"modelInfo\": {\r\n    \"dataUrl\": \"/asset3d/futian/Build/Build.data\",\r\n    \"frameworkUrl\": \"/asset3d/futian/Build/Build.framework.js\",\r\n    \"codeUrl\": \"/asset3d/futian/Build/Build.wasm\",\r\n    \"streamingAssetsUrl\": {\r\n       \"assetbundlespath\":\"/asset3d/futian/AssetBundles/WebGL\",\r\n       \"defaultview\":\"-139.7, 1.7, -225.8,0.3006607,40,101.6533,169.7723\",\r\n       \"defaultfloor\":0\r\n    },\r\n    \"companyName\": \"DefaultCompany\",\r\n    \"productName\": \"NewHH\",\r\n    \"productVersion\": \"0.1\"\r\n  },\r\n  \"defaultFloor\": \"0\",\r\n  \"onlineFloorKeys\": [\"0\"],\r\n  \"floors\": [\r\n    {\r\n      \"label\": \"地面\",\r\n      \"value\": \"0\",\r\n      \"icon\": \"dimian\",\r\n      \"view\": \"-139.7, 1.7, -225.8,0.3006607,40,101.6533,169.7723\"\r\n    }\r\n  ],\r\n  \"pointnames\":[\r\n    \"鼓风机#1\",\r\n    \"鼓风机#2\",\r\n    \"鼓风机#3\",\r\n    \"鼓风机#4\",\r\n    \"鼓风机#5\",\r\n    \"鼓风机#6\",\r\n    \"出厂水质\",\r\n    \"进厂水质\",\r\n    \"精细格栅\",\r\n    \"速沉池\",\r\n    \"纤维转盘滤池\",\r\n    \"初沉淀池#1\",\r\n    \"初沉淀池#2\",\r\n    \"初沉淀池#3\",\r\n    \"初沉淀池#4\",\r\n    \"回收水池\",\r\n    \"生物池#1\",\r\n    \"生物池#2\",\r\n    \"生物池#3\",\r\n    \"生物池#4\",\r\n    \"二沉池#1\",\r\n    \"二沉池#2\",\r\n    \"二沉池#3\",\r\n    \"二沉池#4\",\r\n    \"紫外线\"\r\n  ],\r\n  \"toolsOptions\": [\r\n    {\r\n      \"key\": \"Home\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ]\r\n    },\r\n    {\r\n      \"key\": \"View\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ]\r\n    },\r\n    {\r\n      \"key\": \"Reset\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ]\r\n    },\r\n    {\r\n      \"key\": \"RTData\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ],\r\n      \"initValue\": true\r\n    },\r\n    {\r\n      \"key\": \"Water\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ],\r\n      \"initValue\": true\r\n    },\r\n    {\r\n      \"key\": \"Ground\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ]\r\n    },\r\n    {\r\n      \"key\": \"Roam\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ]\r\n    },\r\n    {\r\n      \"key\": \"Pipeline\",\r\n      \"floors\": [\r\n        \"0\"\r\n      ],\r\n      \"options\": [\r\n        {\r\n          \"label\": \"原水管\",\r\n          \"value\": \"ProcessPipes\"\r\n        },\r\n        {\r\n          \"label\": \"药管\",\r\n          \"value\": \"ChemicalPipes\"\r\n        },\r\n        {\r\n          \"label\": \"中水管\",\r\n          \"value\": \"CleanPipes\"\r\n        },\r\n        {\r\n          \"label\": \"风管\",\r\n          \"value\": \"AirPipes\"\r\n        },\r\n        {\r\n          \"label\": \"污泥管\",\r\n          \"value\": \"MudPipes\"\r\n        }\r\n      ]\r\n    }\r\n  ]\r\n}",
        "flowChartConfig": "{\"data\":[\n  {\"id\":\"c015b365-d54a-4868-b813-122593f7e36e\",\"title\":\"工艺总图\"},\n  {\"id\":\"8ef8fa7a-ede2-4f7e-a5f8-900b88029a58\",\"title\":\"预处理\"},\n  {\n    \"title\":\"加药间\",\n    \"id\":\"menul1\",\n    \"children\":[\n      {\"id\":\"ff96b8f6-71c7-4bd4-83a9-f3f793e5281d\",\"title\":\"PAC\"},\n      {\"id\":\"dcdd7957-3c57-4bc2-a374-9ab0689fb4fb\",\"title\":\"次氯酸钠\"}\n      ]\n  },\n  {\"id\":\"9edb9d78-beeb-4f39-b8d2-c0aac4802cce\",\"title\":\"回收水池\"},\n  {\"id\":\"7ab0c891-01b5-41b9-b38f-0d3130117b86\",\"title\":\"紫外消毒\"},\n  {\"id\":\"8a137b24-537f-403c-afa2-9afcd206d8f5\",\"title\":\"滤池\"},\n  {\"id\":\"cc36b2b6-0cef-4558-82b1-70c1901449d3\",\"title\":\"鼓风机\"},\n  {\"id\":\"f32c4e85-9c0c-4ece-9809-ac1c69e3c657\",\"title\":\"中水泵房\"},\n  {\"id\":\"02ded691-8cb0-437e-bff7-bae2616367bd\",\"title\":\"提升泵站\"},\n  {\n    \"title\":\"生物池\",\n    \"id\":\"menul2\",\n    \"children\":[\n      {\"id\":\"220b96bf-8801-4798-b4c7-61ec72553df4\",\"title\":\"1#生物池\"},\n      {\"id\":\"0902005c-8777-4c73-b76a-100d796eaf75\",\"title\":\"2#生物池\"},\n      {\"id\":\"ae69aaa6-fc1e-4734-8d31-051b2684d811\",\"title\":\"3#生物池\"},\n      {\"id\":\"7a2476a4-e22b-44da-9ec5-e044c73f3843\",\"title\":\"4#生物池\"}\n      ]\n  },\n  {\n    \"title\":\"初沉池\",\n    \"id\":\"menul3\",\n    \"children\":[\n      {\"id\":\"40e56b32-1180-4118-8f06-0160ceeab95f\",\"title\":\"1#初沉池\"},\n      {\"id\":\"0709cbee-13ba-4dd2-ab20-ee036534b899\",\"title\":\"2#初沉池\"},\n      {\"id\":\"a3491ee1-abca-4efb-8d97-3db6415ee8f2\",\"title\":\"3#初沉池\"},\n      {\"id\":\"5421e000-c5e8-4143-a480-aa18ffeefcc2\",\"title\":\"4#初沉池\"}\n      ]\n  },\n  {\n    \"title\":\"二沉池\",\n    \"id\":\"menul4\",\n    \"children\":[\n      {\"id\":\"fe35ada1-e0e1-4331-8a76-054e84263dbd\",\"title\":\"1#二沉池\"},\n      {\"id\":\"5391445a-95ce-4607-8a63-b4e2241bdc0e\",\"title\":\"2#二沉池\"},\n      {\"id\":\"ecf12254-8785-4008-a843-f249be104e8d\",\"title\":\"3#二沉池\"},\n      {\"id\":\"42224c69-b8b7-4236-b5e7-1f847beb4156\",\"title\":\"4#二沉池\"},\n       {\"id\":\"9f34b6cf-468c-448e-b07f-68e6c21aac9e\",\"title\":\"程控率\"}\n      ]\n  },\n   {\n    \"title\":\"配电系统图\",\n    \"id\":\"menul5\",\n    \"children\":[\n      \n     \n       {\"id\":\"3507e4db-2bda-421a-8b6b-b17ac9f2d1eb\",\"title\":\"鼓风机房高压配电总图\"},\n      {\"id\":\"15981162-34a6-4a27-923b-37656e06b4f5\",\"title\":\"鼓风机房高压配电图Ⅰ段\"},\n      {\"id\":\"095951bb-5c4d-40b9-9597-6eda11c7d349\",\"title\":\"鼓风机房高压配电图Ⅱ段\"},\n    {\"id\":\"cd486bca-886a-42f6-baef-aabf3fe5ef77\",\"title\":\"鼓风机房高压电表图\"},\n    {\"id\":\"b437db8b-6252-4f4d-b7e5-42031bb66d34\",\"title\":\"福田泵站高压配电图\"},\n      {\"id\":\"c9fbc7c6-3e75-4328-a22d-29bfd2dad8d4\",\"title\":\"福田泵站高压电表图\"},\n      {\"id\":\"6c1b7a69-35cb-4e5f-8a46-f31b05efbcb4\",\"title\":\"鼓风机房低压配电系统图\"},\n      {\"id\":\"24f1be53-0a40-4d37-bf8a-446cfd80e12f\",\"title\":\"1号线低压配电系统图\"},\n      {\"id\":\"871de61b-3d03-44fc-9d11-2dfbb3385d2f\",\"title\":\"2号线低压配电系统图\"},\n      {\"id\":\"63b76cd7-a43f-491c-ba98-2f319b371cba\",\"title\":\"3号线低压配电系统图\"},\n       {\"id\":\"f6e8d842-f1a0-4ce5-84db-23c176718a1b\",\"title\":\"4号线低压配电系统图\"},\n       {\"id\":\"7a013e17-83e6-4409-b6ee-3908c9bb507a\",\"title\":\"福田泵站低压配电系统图\"},\n       {\"id\":\"460f8f4b-ae28-4f61-86a9-7884bcd96714\",\"title\":\"脱水车间低压配电系统图\"},\n       \n      {\"id\":\"f0a7943c-51d4-4882-86d8-4ca033c6734c\",\"title\":\"综合楼低压配电系统图\"}\n      \n      \n      ]\n  }\n  \n]\n}",
        "externalOrgCode": "s55"
      },
      "id": 72
    }, {
      "code": "QC",
      "name": "侨城水厂",
      "businessCode": "YTQC",
      "tenantId": "32e955ca-37f0-cb39-bbf7-39f9dd66dc9d",
      "threeDimensionalUrl": null,
      "bizType": 1,
      "sort": 4,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "HUAQIAOCHENGSHUICHANG",
        "mapCoord": "114.282613,22.64041",
        "mapPolygonCoords": "114.282613,22.64041;114.1534423828125,22.743256140281986;114.04907226562499,22.743256140281986",
        "mapArea": "盐田区",
        "externalOrgCode": "b3361"
      },
      "id": 1001
    }, {
      "code": "HHC",
      "name": "洪湖水质净化厂",
      "businessCode": "LHHH",
      "tenantId": "10345868-194a-a2f6-2830-39f40ea2f376",
      "threeDimensionalUrl": "/3d-new?f=HHC",
      "bizType": 2,
      "sort": 1,
      "extraProperties": {
        "bluetooth": "1",
        "led": "1",
        "ventilate": "1",
        "isTrashSource": false,
        "mapSubTitle": "HONGHUSHUIZHIJINGHUACHANG",
        "mapCoord": "114.12684,22.578662",
        "mapPolygonCoords": "114.12684,22.578662;114.2083740234375,22.71285645414127;114.3319702148375,22.712856454127",
        "mapArea": "罗湖区",
        "threeConfig": "{\n  \"key\": \"honghu\",\n  \"factoryId\": 2001,\n  \"title\": \"水厂智慧平台\",\n  \"copyright\": \"Copyright(C) 深圳市水务科技有限公司\",\n  \"modelInfo\": {\n    \"dataUrl\": \"/asset3d/honghu/Build/Build.data\",\n    \"frameworkUrl\": \"/asset3d/honghu/Build/Build.framework.js\",\n    \"codeUrl\": \"/asset3d/honghu/Build/Build.wasm\",\n    \"streamingAssetsUrl\":\"/asset3d/honghu/AssetBundles/WebGL\",\n    \"companyName\": \"DefaultCompany\",\n    \"productName\": \"NewHH\",\n    \"productVersion\": \"0.1\"\n  },\n  \"EQRunInterval\": 60000,\n  \"RTDataInterval\": 10000,\n  \"HACCPInterval\": 300000,\n  \"controls\":{\n    \"SafetyPanel.AccessControlRecord\": true,     \n    \"SafetyPanel.FloodSafety\": true,\n    \"SafetyPanel.FloodRehearse\": true\n  },\n  \"defaultFloor\": \"-1\",\n  \"onlineFloorKeys\": [\"-1\", \"-2\"],\n  \"floors\":[\n     {\n      \"label\": \"鸟瞰图\",\n      \"value\": \"0\",\n      \"icon\": \"dimian\",\n      \"view\": \"-49.1, 6.6, 49.9,179.9781,40,35.5468,58.14552\"\n    },\n    {\n      \"label\": \"总览\",\n      \"value\": \"-4\",\n      \"icon\": \"zonglan\",\n      \"view\": \"-54.4, 40.0, -48.1,180.151,39,120.573,194.7931\"\n    },\n    {\n      \"label\": \"负一层\",\n      \"value\": \"-1\",\n      \"icon\": \"fuyiceng\",\n      \"view\": \"-46.9, 1.0, 0.4,0,40,32.5,63.35202\"\n    },\n    {\n      \"label\": \"负二层\",\n      \"value\": \"-2\",\n      \"icon\": \"fuerceng\",\n      \"view\": \"-46.9, 1.0, 0.4,0,40,32.5,63.35202\"\n    },\n    {\n      \"label\": \"负三层\",\n      \"value\": \"-3\",\n      \"icon\": \"fusanceng\",\n      \"view\":  \"10.8, 13.6, 4.9,89.12034,33,7.383321,12.4508\"\n    }\n  ],\n  \"pointnames\":[\n      \"进厂水质\",\n      \"出厂水质\",\n      \"鼓风机#1\",\n      \"鼓风机#2\",\n      \"鼓风机#3\",\n      \"膜池鼓风机#1\",\n      \"膜池鼓风机#2\",\n      \"膜池鼓风机#3\",\n      \"中水\",\n      \"膜池\",\n      \"生化好氧\",\n      \"生化缺氧\",\n      \"生化厌氧\",\n      \"精细格栅\",\n      \"速沉池\",\n      \"细格栅\",\n      \"曝气沉砂池\",\n      \"污泥池\"\n  ],\n  \"toolsOptions\": [\n    {\n      \"key\": \"Home\",\n      \"floors\": [\n        \"0\",\n        \"-1\",\n        \"-2\",\n        \"-3\",\n        \"-4\"\n      ]\n    },\n    {\n      \"key\": \"View\",\n      \"floors\": [\n        \"0\",\n        \"-1\",\n        \"-2\",\n        \"-3\",\n        \"-4\"\n      ]\n    },\n    {\n      \"key\": \"RTData\",\n      \"floors\": [\n        \"-1\",\n        \"-2\"\n      ],\n      \"initValue\": true\n    },\n    {\n      \"key\": \"AirDucts\",\n      \"floors\": [\n        \"-1\"\n      ]\n    },\n    {\n      \"key\": \"Water\",\n      \"floors\": [\n        \"-2\"\n      ],\n      \"initValue\": true\n    },\n    {\n      \"key\": \"Glass\",\n      \"floors\": [\n        \"-1\"\n      ],\n      \"initValue\": true\n    },\n    {\n      \"key\": \"Perspective\",\n      \"floors\": [\n        \"-1\"\n      ]\n    },\n    {\n      \"key\": \"WorkAreas\",\n      \"floors\": [\n        \"-1\"\n      ],\n      \"options\": [\n        {\n          \"label\": \"第四分区\",\n          \"value\": 4\n        },\n        {\n          \"label\": \"第五分区\",\n          \"value\": 5\n        },\n        {\n          \"label\": \"第六分区\",\n          \"value\": 6\n        },\n        {\n          \"label\": \"第七分区\",\n          \"value\": 7\n        },\n        {\n          \"label\": \"第八分区\",\n          \"value\": 8\n        },\n        {\n          \"label\": \"第九分区\",\n          \"value\": 9\n        }\n      ]\n    },\n    {\n      \"key\": \"SegmentAnimation\",\n      \"floors\": [\n        \"-2\"\n      ]\n    }\n  ]\n}",
        "flowChartConfig": "{\"data\":[{\"id\":\"2987eac5-9c0e-4955-9de1-2ce20db75028\",\"title\":\"工艺总图\"},{\"id\":\"0f1ae879-357f-4af1-95fb-199a5900949e\",\"title\":\"智能工艺控制\"},{\r      \"title\": \"泵站\",\r      \"id\":\"menu1\",\r      \"children\":[\r          {\"id\":\"966f5e86-b3b0-47c0-9ebc-d99fc8d01f54\",\"title\":\"宝安路泵站\"},\r          {\"id\":\"cb72ada3-50ab-463e-b702-66f752ac5c36\",\"title\":\"洪湖泵站\"}\r      ]\r    },{\"id\":\"97195982-9cba-4b0e-aa4a-c6a811e0e1de\",\"title\":\"细格栅\"},{\"id\":\"9cfe6a3d-d4e7-47eb-8cba-1d8daa2226b3\",\"title\":\"速沉池\"},{\r      \"title\": \"加药间\",\r      \"id\":\"menu2\",\r      \"children\":[\r          {\"id\":\"a5a2e3e8-3643-4656-b55a-df67c1f65b2b\",\"title\":\"乙酸钠加药间\"},\r          {\"id\":\"c459ff4d-5b48-42c2-b6c1-ab153192ac30\",\"title\":\"PAC加药间\"}\r      ]\r    },{\"id\":\"43cf3edc-335e-48be-aa1b-2c4ce7c797e1\",\"title\":\"精细格栅\"},{\"id\":\"5436ff12-19e8-4c03-b355-73780a5f1d4d\",\"title\":\"生化池\"},{\"id\":\"3409d2b3-63de-43bb-a0b5-cc919e0b3cdc\",\"title\":\"生化池鼓风机\"},{\"id\":\"395749fd-e8c3-4fa9-a006-719604f2555e\",\"title\":\"膜池\"},{\"id\":\"916c29d9-49fa-4361-8b95-c248c0007121\",\"title\":\"膜池鼓风机\"},{\"id\":\"c331d08c-ce84-4205-b677-01a1e2dac68e\",\"title\":\"污泥泵房\"},{\"id\":\"523bed55-ad11-444e-9ab8-2778fa5a79f4\",\"title\":\"除臭系统\"}]}",
        "externalOrgCode": "B967"
      },
      "id": 2001
    }, {
      "code": "SZBSNL",
      "name": "南岭泵站",
      "businessCode": "SZBSNL",
      "tenantId": "3325c488-798b-0925-763c-39fdcfce5ae7",
      "threeDimensionalUrl": null,
      "bizType": 1,
      "sort": 1,
      "extraProperties": {},
      "id": 3001
    }, {
      "code": "SZBSJP",
      "name": "截排站",
      "businessCode": "SZBSJP",
      "tenantId": "3325c488-798b-0925-763c-39fdcfce5ae7",
      "threeDimensionalUrl": null,
      "bizType": 1,
      "sort": 2,
      "extraProperties": {},
      "id": 3002
    }, {
      "code": "SZBSDZT",
      "name": "丹竹头",
      "businessCode": "SZBSDZT",
      "tenantId": "3325c488-798b-0925-763c-39fdcfce5ae7",
      "threeDimensionalUrl": null,
      "bizType": 1,
      "sort": 3,
      "extraProperties": {},
      "id": 3003
    }, {
      "code": "SZBSGK",
      "name": "甘坑",
      "businessCode": "SZBSGK",
      "tenantId": "3325c488-798b-0925-763c-39fdcfce5ae7",
      "threeDimensionalUrl": null,
      "bizType": 1,
      "sort": 4,
      "extraProperties": {},
      "id": 3004
    }, {
      "code": "SZBSLHS",
      "name": "莲花水",
      "businessCode": "SZBSLHS",
      "tenantId": "3325c488-798b-0925-763c-39fdcfce5ae7",
      "threeDimensionalUrl": null,
      "bizType": 1,
      "sort": 5,
      "extraProperties": {},
      "id": 3005
    }, {
      "code": "YDPSBZ",
      "name": "排水泵站",
      "businessCode": "YDPSBZ",
      "tenantId": "32e955ca-37f0-cb39-bbf7-39f9dd66dc9d",
      "threeDimensionalUrl": null,
      "bizType": 2,
      "sort": 5,
      "extraProperties": {},
      "id": 3101
    }, {
      "code": "NSBZGLS",
      "name": "南山泵站管理所",
      "businessCode": "NSBZGLS",
      "tenantId": "86cfd7c1-72f9-36da-6fe8-39fdaa8250cb",
      "threeDimensionalUrl": null,
      "bizType": 3,
      "sort": 6,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "NANSHANBENGZHANGUANLISUO",
        "mapCoord": "113.931907,22.565399",
        "mapPolygonCoords": "",
        "mapArea": "南山区",
        "flowChartConfig": "{\"data\":[ \r\n { \"title\": \"前海片区\",\r\n      \"id\":\"menu1\",\r\n      \"children\":[\r\n        {\"id\":\"b8f48dc3-86a4-41ea-9cf4-b137988ee909\",\"title\":\"创业路泵站\"},\r\n        {\"id\":\"95698bab-9806-4c86-ab39-a69c65526e33\",\"title\":\"蛇口5#泵站\"},\r\n        {\"id\":\"2129b02d-1c74-40b7-87b4-b82935bfc2e7\",\"title\":\"蛇口4#泵站\"},\r\n        {\"id\":\"63ef4044-bcf0-43be-94fb-2962c74d7176\",\"title\":\"板桥雨污水泵站\"},\r\n        {\"id\":\"1768244b-692f-40af-ab6b-f23418e8dcb7\",\"title\":\"登良泵站\"},\r\n        {\"id\":\"d8f2a27f-e57b-4712-a8d0-4c6732abc8c5\",\"title\":\"前海雨污水泵站\"},\r\n        {\"id\":\"5ed19721-44b8-4094-9fd2-7eac2fffd0b3\",\"title\":\"工业区1#泵站\"},\r\n        {\"id\":\"b3bf92f4-fa3f-426e-aa72-deab7b4c0bbf\",\"title\":\"工业区2#泵站\"},\r\n        {\"id\":\"f74c86b0-10af-4884-af5f-9a06e2fdb207\",\"title\":\"工业区3#泵站\"},\r\n        {\"id\":\"917abc6a-3562-425b-b959-4e3ccf1e719a\",\"title\":\"工业区4#泵站\"},\r\n        {\"id\":\"037bbc5a-4e4b-4159-99f9-43de1e761466\",\"title\":\"赤湾1#泵站\"},\r\n        {\"id\":\"67abb6c9-9231-4ddf-af85-885ac77a8eaf\",\"title\":\"赤湾2#泵站\"},\r\n        {\"id\":\"6033a3e5-3ffc-4eda-a9aa-bed7c279fbb6\",\"title\":\"前海湾泵站\"},\r\n        {\"id\":\"edf74d9b-e055-4f67-98a9-fadd3800d4e6\",\"title\":\"关口渠泵站\"},\r\n        {\"id\":\"1d58be30-667a-4875-8d26-bb32b680fe7a\",\"title\":\"郑宝坑渠泵站\"},\r\n        {\"id\":\"c63138bb-3df7-462d-ad57-677de6d0f7c6\",\"title\":\"桂庙渠泵站\"},\r\n        {\"id\":\"e7cac7ad-0896-41f6-ad23-28d3fe55b03e\",\"title\":\"海斯比泵站\"},\r\n        {\"id\":\"af2d138c-75e0-4811-87d3-256f3c68da1c\",\"title\":\"后海村泵站\"},\r\n        {\"id\":\"2a217378-a10d-4bb9-ab42-8c58bf5d9754\",\"title\":\"南山村泵站\"},\r\n        {\"id\":\"ad20e26f-1c8e-42e7-a3fd-e7030be4a991\",\"title\":\"新圳河截污泵站\"},\r\n        {\"id\":\"999f1f83-bd83-48f2-80df-d0408622e665\",\"title\":\"3号闸\"},\r\n        {\"id\":\"704de8a3-7553-4eb5-a84d-ae9679e1378a\",\"title\":\"西部通道1#\"}]},\r\n        \r\n  { \"title\": \"后海片区\",\r\n      \"id\":\"menu2\",\r\n      \"children\":[\r\n      {\"id\":\"b3441244-f4a5-498d-9af3-9ce7e28805fc\",\"title\":\"华侨城泵站\"},\r\n      {\"id\":\"305d2ba8-88a4-4a27-8e69-f7904d3fe1e0\",\"title\":\"白石洲泵站\"},\r\n      {\"id\":\"27300370-60a8-4dfe-95e8-4509380629c8\",\"title\":\"龙井泵站\"},\r\n      {\"id\":\"3a628730-0f9f-4691-acfb-5469fb58a3d6\",\"title\":\"后海泵站\"},\r\n      {\"id\":\"425e54c7-8f07-4893-8a58-b37756189a24\",\"title\":\"大沙河河口泵站\"},\r\n      {\"id\":\"e71c3e68-ac94-4d24-9b8a-7756883bee85\",\"title\":\"华侨城湿地泵站\"},\r\n      {\"id\":\"7ef518bc-9d14-46c1-ae5f-32eb3537b08e\",\"title\":\"沙河西污水泵站\"},\r\n      {\"id\":\"d97c827c-13f7-4781-bbed-2090301dd70c\",\"title\":\"沙河四村泵站\"},\r\n      {\"id\":\"20891345-718a-407b-acce-ec1ecbb57f61\",\"title\":\"西部通道2#\"},\r\n      {\"id\":\"c020995c-b61b-42b5-be45-82d966e8d529\",\"title\":\"滨海大道地下泵房1#\"},\r\n      {\"id\":\"72828943-85b7-46a2-8641-884eeb77a5e2\",\"title\":\"滨海大道地下泵房2#\"},\r\n      {\"id\":\"c981266a-fba1-4d2f-8b44-c85552aadb91\",\"title\":\"滨海大道地下泵房3#\"},\r\n      {\"id\":\"f00fabf4-ca38-467f-ab64-d09c7c66b874\",\"title\":\"大涌转输泵站\"}\r\n      ]},\r\n      \r\n      { \"title\": \"西丽片区\",\r\n      \"id\":\"menu3\",\r\n      \"children\":[\r\n      {\"id\":\"68e60182-32bb-4d28-90a7-adb0b090878a\",\"title\":\"王京坑泵站\"},\r\n      {\"id\":\"46ceed80-eede-4917-8018-69f447e78a06\",\"title\":\"大勘村泵站\"},\r\n      {\"id\":\"b9c3ab57-d876-4cc7-94f9-0307c6d21451\",\"title\":\"麒麟山泵站\"},\r\n      {\"id\":\"a9cd59dd-a04f-44ab-9a9b-e210fc8d36db\",\"title\":\"百旺泵站\"},\r\n      {\"id\":\"a2838380-6b92-4b1b-b6d2-fa783df765bb\",\"title\":\"牛城泵站\"},\r\n      {\"id\":\"5db9289f-7bc8-4631-962d-8e8ad427e20e\",\"title\":\"白芒2#泵站\"},\r\n      {\"id\":\"93c3905a-0951-4faf-aabe-ec2a371f87ef\",\"title\":\"铁岗原水泵站\"},\r\n      {\"id\":\"9aa43de7-fdb4-450d-b292-02d0b05cb8fe\",\"title\":\"西丽加药站\"}\r\n      ]}\r\n]}",
        "externalOrgCode": "b1023"
      },
      "id": 3201
    }, {
      "code": "FTBZGLS",
      "name": "福田泵站管理所",
      "businessCode": "FTBZGLS",
      "tenantId": "80a43d7f-0aa8-0f38-974a-39fe6e4c32fb",
      "threeDimensionalUrl": null,
      "bizType": 3,
      "sort": 2,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "HUTIANBENGZHANGUANLISUO",
        "mapCoord": "",
        "mapPolygonCoords": "",
        "mapArea": "",
        "externalOrgCode": "b1566"
      },
      "id": 3301
    }, {
      "code": "LHBZGLS",
      "name": "罗湖泵站管理所",
      "businessCode": "LHBZGLS",
      "tenantId": "10345868-194a-a2f6-2830-39f40ea2f376",
      "threeDimensionalUrl": null,
      "bizType": 3,
      "sort": 3,
      "extraProperties": {
        "isTrashSource": false,
        "mapSubTitle": "LUOHUBENGZHANGUANLISUO",
        "mapCoord": "",
        "mapPolygonCoords": "",
        "mapArea": "",
        "flowChartConfig": "{\n  \"data\": [\n    \n     {\n      \"id\": \"e7bb21b2-f78a-48e4-9ad4-0d2b17ab66e0\",\n      \"title\": \"东湖原水泵站\"\n    },\n    \n    \n    {\n      \"title\": \"排水泵站\",\n      \"id\":\"menu2\",\n      \"children\":[\n         {\n      \"id\": \"80ba8b4c-2e4f-4f35-afd2-1f4f27ba8984\",\n      \"title\": \"宝安路泵站\"\n    },\n    {\n      \"id\": \"f225ebf8-ef81-45cb-9285-d650d1c5c188\",\n      \"title\": \"东门泵站\"\n    },\n    {\n      \"id\": \"cfd4f2b5-5df5-4951-ab47-a334d6f5471b\",\n      \"title\": \"罗雨干渠一体化泵站\"\n    },\n    {\n      \"id\": \"4a926774-7e90-4789-a7c6-7d0bc1ade839\",\n      \"title\": \"清水河一体化泵站\"\n    },\n    {\n      \"id\": \"e6a1c277-a04a-4b01-9cef-935b9a701120\",\n      \"title\": \"高涧河一体化泵站\"\n    },\n    {\n      \"id\": \"244da241-7782-42f0-96f4-26502e928b60\",\n      \"title\": \"草埔一体化泵站\"\n    },\n    {\n      \"id\": \"3b07e74b-7a9f-4ae6-b23d-1303d5bcfc8c\",\n      \"title\": \"宝安南地下通道泵站\"\n    },\n    {\n      \"id\": \"c095d8ec-766c-4b19-9c95-09c18db33647\",\n      \"title\": \"向西北地下通道泵站\"\n    },\n    {\n      \"id\": \"f26f94f0-08f9-46b8-87aa-4090038f4609\",\n      \"title\": \"布吉地下通道泵站\"\n    },\n    {\n      \"id\": \"44aa2406-be98-4b33-90ff-e3ddd3faba9e\",\n      \"title\": \"兰科泵站\"\n    },\n    {\n      \"id\": \"5f37449e-d6a0-4c98-a863-e48e680d0c37\",\n      \"title\": \"正坑泵站\"\n    },\n    {\n      \"id\": \"d79a8230-279a-46e8-87fb-b145900cdd53\",\n      \"title\": \"和平泵站\"\n    },\n    {\n      \"id\": \"1a839d8c-2b5b-4d20-9f03-c700cee79db1\",\n      \"title\": \"罗雨泵站\"\n    },\n    {\n      \"id\": \"69607617-5f42-41d1-a6af-93779c42e3cf\",\n      \"title\": \"蔡屋围泵站\"\n    },\n    {\n      \"id\": \"5ab06f70-c6d7-4cdb-be8e-4d9aa3a9de0a\",\n      \"title\": \"洪湖泵站\"\n    },\n    {\n      \"id\": \"6eb155f6-e879-4139-90cc-8805ee640fc0\",\n      \"title\": \"大小坑泵站\"\n    },\n    {\n      \"id\": \"3166a5fc-2ad7-410c-88c4-4332e7a0ba47\",\n      \"title\": \"北斗泵站\"\n    },\n    {\n      \"id\": \"614261b8-99da-40ef-9dba-36885dfc756e\",\n      \"title\": \"新秀泵站\"\n    },\n    {\n      \"id\": \"91ff802e-b769-47a5-be8c-1b4c766b8308\",\n      \"title\": \"东湖排水泵站\"\n    },\n    {\n      \"id\": \"264ea281-fac0-4617-892f-769eb1e40341\",\n      \"title\": \"大望泵站\"\n    },\n    {\n      \"id\": \"ee6a0b37-9f82-48b3-8963-1ce40c643782\",\n      \"title\": \"沙湾泵站\"\n    } \n      ]\n    }\n    \n    \n    \n    \n    \n    \n    \n   \n   \n  ]\n}",
        "externalOrgCode": "bz001"
      },
      "id": 3401
    }, {
      "code": "TEST01",
      "name": "测试水厂01",
      "businessCode": "TEST01",
      "tenantId": "8b80cee7-7907-a2ea-4db5-39fa5e5090d8",
      "threeDimensionalUrl": null,
      "bizType": 2,
      "sort": 3,
      "extraProperties": {},
      "id": 9001
    }]}
    const factories = respone.data
    factories.forEach(factory => {
      factory.extraProperties = factory.extraProperties || {}

      factory.mapCoord = []
      factory.mapPolygonCoords = []
      factory.mapSubTitle = factory.extraProperties.mapSubTitle
      factory.mapArea = factory.extraProperties.mapArea
      factory.orderType = factory.extraProperties.orderType

      if (factory.extraProperties.mapCoord) {
        factory.mapCoord = factory.extraProperties.mapCoord.split(',').map(x => parseFloat(x))
      }
      if (factory.extraProperties.mapPolygonCoords) {
        const coords = factory.extraProperties.mapPolygonCoords.split(';')
        for (const coord of coords) {
          factory.mapPolygonCoords.push(coord.split(',').map(x => parseFloat(x)))
        }
      }
    })
    return factories
  },
}