
#### 注意

```json
1.接口授權碼key，由系統分配給商戶, 在IB商戶後台獲取. 接下來文檔的key以 ce413a4084db66ae8cca32a6ce8b2545 為例
2.為兼容所有計算機語言,本系統接收的所有參數類型均為字符串(String)
```



### 1、生成地址

#### 1.1 場景說明

獲取指定幣種地址, 該地址與傳入的<font color=#ff9900 size=4>businessId</font>(商戶內部的用戶名或訂單號)綁定, 一是方便在商戶後台通過此<font color=#ff9900 size=4>businessId</font>進行查賬, 二是方便找回已經生成的地址. 經過此API生成的地址, 有資金入賬時均會得到回調接口[查看](#5、回調)的通知.

**注意**：商戶賬號可創建的地址數有上限, 測試階段上限為10. 進入生產階段前可聯繫客服,上限將升級至1000. 如需更多地址, 請聯繫客服處理

#### 1.2 接口詳情

##### 1.2.1 接口地址

|   接口詳情   |                                 |
| :----------: | :-----------------------------: |
|     URL      |   【/api/v1/wallet/create】    |
|   請求方式   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 1.2.2 參數

###### 1.2.2.1 參數說明

|     參數     |    類型    | 是否必填 |         說明          |                             備註                             |
|:----------:|:--------:| :------: |:-------------------:| :----------------------------------------------------------: |
| timestamp  |  String  |    是    |         時間戳         |                            單位秒                            |
|   nonce    |  String  |    是    |        隨機字符串        |             長度<=64位(用途: 保證安全,防止破譯)              |
|    sign    |  String  |    是    |         簽名          | <font color=#ff9900 size=4>md5</font>規則如下,算法是32位小寫 |
| merchantId |  String  |    是    |        商戶ID         |                    IB商戶平台提供的商戶id                    |
| businessId |  String  |    是    | 商戶地址關聯對象的唯一標識(地址別名) | 本參數與地址有關聯, 當某值被首次傳入時, 會生成全新地址(當某值被重複傳入時,會返回之前的相同地址), 如果想要生成不同的地址, 請傳入不同的值 |
| currency   | String   |    是    |         幣種名         |       1.字母需大寫 2.幣種列表[查看](#4、獲取幣種列表)        |
| notify_url |  String  |    是    |    地址到賬通知地址         |                                                                           |


將各個參數的值拼接後,對其進行<font color=#ff9900 size=4>md5</font> 32位加密, 得到<font color=#ff9900 size=4>sign</font>

**注意**: 參與<font color=#ff9900 size=4>md5</font>簽名計算的參數必須按照如下(ASCII順序表 + <font color=#ff9900 size=4>key</font>)順序拼接,否則會導致驗簽不通過

<table>   <tr>     <td bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign= strtoupper(md5(businessId=1 & currency=TRX & merchantId=2SlSxZPmXqaHQrwkXonFs0Ce & nonce=17437263 & notify_url=https://aa.com/callback & timestamp=1659409578 & key=2e9070583f8767c6260aba8be3ff2088))</font> </td>   </tr> </table>

 例:  sign= strtoupper(md5(businessId=1 & currency=TRX & merchantId=2SlSxZPmXqaHQrwkXonFs0Ce & nonce=17437263 & notify_url=https://aa.com/callback & timestamp=1659409578 & key=2e9070583f8767c6260aba8be3ff2088))



XRP地址有特殊的規則, 以此地址為例: r3ReqczYCCc44pUxU9bmWauCSzJJoiy2oD|84399219

在生成的XRP地址中, "|"後面的 "84399219"為標籤(memo) ,請截取保存

###### 1.2.2.2 請求示例

```json
{
  "timestamp": "1598928950",
  "nonce": "2355",
  "sign": "507ba9d74c5d2ab6f8979907966dc627",
  "merchantId": "2008250539582990000",
  "businessId":"S3454ss231",
  "currency":"BTC",
  "notify_url": "https://aa.com/callback"
}
```

###### 1.2.2.3 正常響應示例

```json
{
  "code": "200",
  "data": {
        "address": "3F4jmZpP5VMoB7yWPmHZfQip3vm5detScx",    //地址
        "currency": "BTC"    //幣種名
  },
  "message": "SUCCESS"
}
```

###### 1.2.2.4 異常響應示例  [查看](#返回狀態碼)

```json
{"code":"401","message":"Unauthorized","data":null}   //驗簽失敗
```





### 2、提幣 

#### 2.1 場景說明

提幣, 可指定幣種名和數量進行提幣轉賬操作. 如果在傳入的<font color=#ff9900 size=4>businessId</font>中拼接商戶內部的用戶名或訂單號, 就可以商戶後台通過商戶內部的用戶名或訂單號進行查賬. 調用此API後, 該筆提現狀態變更時均會得到回調接口[查看](#5、回調)的通知.

#### 2.2 接口詳情

##### 2.2.1 接口地址

|   接口詳情   |                                 |
| :----------: | :-----------------------------: |
|     URL      |      【/api/v1/wallet/withdraw】       |
|   請求方式   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 2.2.2 參數

###### 2.2.2.1 參數說明

|    參數    |  類型  | 是否必填 |                 說明                 |                             備註                             |
| :--------: | :----: | :------: | :----------------------------------: | :----------------------------------------------------------: |
| timestamp  | String |    是    |                時間戳                |                            單位秒                            |
|   nonce    | String |    是    |              隨機字符串              |             長度<=64位(用途: 保證安全,防止破譯)              |
|    sign    | String |    是    |                 簽名                 | <font color=#ff9900 size=4>md5</font>規則如下,算法是32位小寫 |
| merchantId | String |    是    |                商戶ID                |                    IB商戶平台提供的商戶ID                    |
|  address   | String |    是    |               提幣地址               |                                                              |
|   amount   | String |    是    |               提幣數量               |                                                              |
|  currency  | String |    是    |                幣種名                |         字母需大寫, 幣種列表[查看](#4、獲取幣種列表)         |
| businessId | String |    是    | "商戶內部用戶名或訂單名" 拼接 唯一ID |                 長度<=64, 詳細規則在表格下方                 |
|    memo    | String |    否    |                 備註                 |          XRP的提幣申請該字段可選，其他類型幣種不填           |
| notify_url |  String  |    是    |    地址到賬通知地址         |                                                                           |

關於 <font color=#ff9900 size=4>businessId</font>參數:

1.如果有用戶名/訂單號需求，<font color=#ff9900 size=4>businessId</font> 可傳用戶名或訂單號+ "&"+唯一ID( 唯一ID不含"&"符號, 必須保證該字段唯一, 如果重複，則該提現不會被處理, 唯一ID可保證一筆提現不會因商戶錯誤操作或者網絡問題, 被轉賬兩次). 例: xiaoming&2354912701

2.如果不想填入用戶名或訂單號, <font color=#ff9900 size=4>businessId</font> 請直接傳入唯一ID( 唯一ID不含"&"符號, 必須保證該字段唯一, 如果重複，則該提現不會被處理, 唯一ID可保證一筆提現不會因商戶錯誤操作或者網絡問題, 被轉賬兩次), 例: 2354912701

3.唯一ID ,例: 2354912701, 將在提幣回調中 , 在<font color=#ff9900 size=4>businessId</font>字段中返回, 幫助商家跟踪該筆提幣的狀態

4.此<font color=#ff9900 size=4>businessId</font>與 創建地址[查看](#1、生成地址)的 <font color=#ff9900 size=4>businessId</font>並無關聯



將各個參數的值拼接後,對其進行<font color=#ff9900 size=4>md5</font> 32位加密, 得到<font color=#ff9900 size=4>sign</font>

**注意**: 參與<font color=#ff9900 size=4>md5</font>簽名計算的參數必須按照如下(ASCII順序表 + <font color=#ff9900 size=4>key</font>)順序拼接,否則會導致驗簽不通過

<table>   <tr>     <td bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign=  strtoupper(md5( address = TCLDvRhRgtjBhHuNJZhBnnSG7A3RiqGEya&amount=1 & businessId=TEST2022080211205887199 & currency=USDT-TRC20 & merchantId=bYPhrixkgRX2KjJ4QJUp083v&nonce=26831146 & notify_url=https://aa.com/callback&timestamp=1659410458 & key=ce413a4084db66ae8cca32a6ce8b2545 ))</font> </td>   </tr> </table>

例:strtoupper(md5( address = TCLDvRhRgtjBhHuNJZhBnnSG7A3RiqGEya&amount=1 & businessId=TEST2022080211205887199 & currency=USDT-TRC20 & merchantId=bYPhrixkgRX2KjJ4QJUp083v&nonce=26831146 & notify_url=https://aa.com/callback&timestamp=1659410458 & key=ce413a4084db66ae8cca32a6ce8b2545 ))

###### 2.2.2.2 請求示例

```json
{
  "timestamp": "1598928950",
  "nonce": "2222",
  "sign": "507ba9d74c5d2ab6f8979907966dc627",
  "merchantId": "2008250539582990000",
  "address":"r3ReqczYCCc44pUxU9bmWauCSzJJoiy2oD",
  "amount":"0.2",
  "currency":"XRP",
  "businessId":"sdf4sd0a",
  "notify_url": "https://aa.com/callback"
}
```



當不填寫 <font color=#ff9900 size=4>memo</font>參數時:

<table>   <tr>     <td bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign=  md5(address + amount + businessId + currency + merchantId + nonce + timestamp+ key)</font> </td>   </tr> </table>

例:md5(r3ReqczYCCc44pUxU9bmWauCSzJJoiy2oD0.2sdf4sd0aXRP200825053958299000022221598928950ce413a4084db66ae8cca32a6ce8b2545)

請求示例:

```json
{
  "timestamp": "1598928950",
  "nonce": "2222",
  "sign": "507ba9d74c5d2ab6f8979907966dc627",
  "merchantId": "2008250539582990000",
  "address":"1Js82NkgYbZ6td7KZ3jEnLMiqNFmnnKVqP",
  "amount":"0.2",
  "currency":"BTC",
  "businessId":"sdf4sd0a",
  "memo": ""   //memo可以傳入"", 甚至不傳入memo參數 
}
```



###### 2.2.2.3 正常響應示例 

```json
{
  "code": "200",
  "message": "SUCCESS"
}
```

###### 2.2.2.4 異常響應示例  [查看](#返回狀態碼)

```json
{
  "code": "545",
  "message": "The unique transfer ID has been submitted. To avoid maloperation of the commercial tenant, the transfer cannot be handled.", //提幣唯一ID已被提交,為避免商家誤操作,此次提幣不會被受理
  "data": null
}
```





### 3、校驗地址

#### 3.1 場景說明

可校驗各個幣種的地址格式是否符合正確. 本接口不是必需接口, 可酌情接入.

用例: 用戶在商戶自家平台進行提幣操作, 填寫了幣種:BTC, 地址:11111, 商戶調用本接口, 便可知道用戶填寫的地址格式錯誤, 方便提醒用戶.

#### 3.2 接口詳情

##### 3.2.1 接口地址

|   接口詳情   |                                 |
| :----------: | :-----------------------------: |
|     URL      |    【/api/v1/wallet/valid】     |
|   請求方式   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 3.2.2 參數

###### 3.2.2.1 參數說明

|    參數    |  類型  | 是否必填 |    說明    |                             備註                             |
| :--------: | :----: | :------: | :--------: | :----------------------------------------------------------: |
| timestamp  | String |    是    |   時間戳   |                            單位秒                            |
|   nonce    | String |    是    | 隨機字符串 |             長度<=64位(用途: 保證安全,防止破譯)              |
|    sign    | String |    是    |    簽名    | <font color=#ff9900 size=4>md5</font>規則如下,算法是32位小寫 |
| merchantId | String |    是    |   商戶ID   |                    IB商戶平台提供的商戶ID                    |
|  address   | String |    是    |    地址    |                                                              |
|  currency  | String |    是    |   幣種名   |                                                              |



將各個參數的值拼接後,對其進行<font color=#ff9900 size=4>md5</font> 32位加密, 得到<font color=#ff9900 size=4>sign</font>

**注意**: 參與<font color=#ff9900 size=4>md5</font>簽名計算的參數必須按照如下(ASCII順序表 + <font color=#ff9900 size=4>key</font>)順序拼接,否則會導致驗簽不通過

<table>   <tr>     <td bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign=   strtoupper(md5(address = TRdJQgXyiUoSfJmzhvJ3u1sfS6nTdnzetz & currency=TRX & merchantId=bYPhrixkgRX2KjJ4QJUp083v & nonce=65774377 & timestamp=1659410974 & key=ce413a4084db66ae8cca32a6ce8b2545))</font> </td>   </tr> </table>

例: sign= strtoupper(md5(address = TRdJQgXyiUoSfJmzhvJ3u1sfS6nTdnzetz & currency=TRX & merchantId=bYPhrixkgRX2KjJ4QJUp083v & nonce=65774377 & timestamp=1659410974 & key=ce413a4084db66ae8cca32a6ce8b2545))

###### 3.2.2.2 請求示例

```json
{
  "timestamp": "1598928950",
  "nonce": "2355",
  "sign": "507ba9d74c5d2ab6f8979907966dc627",
  "merchantId": "2008250539582990000",
  "address":"r3ReqczYCCc44pUxU9bmWauCSzJJoiy2oD",
  "currency":"XRP",
}
```

###### 3.2.2.3 成功響應示例

```json
{
  "code": "200",
  "message": "SUCCESS"
}
```

###### 3.2.2.4 異常響應示例  [查看](#返回狀態碼)

```json
{
  "code": "550",
  "message": "ADDRESS ERROR", //地址校驗失敗
  "data": null
}
```





### 4、獲取幣種列表

#### 4.1 場景說明

可獲取所有幣種列表, 甚至可以獲取到商戶每個幣種的餘額

#### 4.2 接口詳情

##### 4.2.1 接口地址

|   接口詳情   |                                 |
| :----------: | :-----------------------------: |
|     URL      |      【/api/v1/wallet/supportCoins】       |
|   請求方式   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 4.2.2 參數

###### 4.2.2.1 參數說明

|    參數     |  類型  | 是否必填 |     說明     |                             備註                             |
| :---------: | :----: | :------: | :----------: | :----------------------------------------------------------: |
|  timestamp  | String |    是    |    時間戳    |                            單位秒                            |
|    nonce    | String |    是    |  隨機字符串  |             長度<=64位(用途: 保證安全,防止破譯)              |
|    sign     | String |    是    |     簽名     | <font color=#ff9900 size=4>md5</font>規則如下,算法是32位小寫 |
| merchantId  | String |    是    |    商戶ID    |                    IB商戶平台提供的商戶ID                    |

將各個參數的值拼接後,對其進行<font color=#ff9900 size=4>md5</font> 32位加密, 得到<font color=#ff9900 size=4>sign</font>

**注意**: 參與<font color=#ff9900 size=4>md5</font>簽名計算的參數必須按照如下(ASCII順序表 + <font color=#ff9900 size=4>key</font>)順序拼接,否則會導致驗簽不通過

<table > <tr>  <td  bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign=  strtoupper(md5(merchantId = bYPhrixkgRX2KjJ4QJUp083v & nonce=59801214 & timestamp=1659411403 & key=ce413a4084db66ae8cca32a6ce8b2545))</font> </td>  </tr> </table>

例: sign= strtoupper(md5(merchantId = bYPhrixkgRX2KjJ4QJUp083v & nonce=59801214 & timestamp=1659411403 & key=ce413a4084db66ae8cca32a6ce8b2545))

###### 4.2.2.2 請求示例

```json
{
  "timestamp": "1598928950",
  "nonce": "2355",
  "sign": "507ba9d74c5d2ab6f8979907966dc627",
  "merchantId": "2008250539582990000"
}
```

###### 4.2.2.3 響應示例

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "TRX": {
      "currency": "TRX",
      "logo": "",
      "balance": 0,
      "minWithdraw": 0.1,
      "maxWithdraw": 100000
    },
    "USDT-TRC20": {
      "currency": "USDT-TRC20",
      "logo": "",
      "balance": 0,
      "minWithdraw": 0.1,
      "maxWithdraw": 100000
    },
    "USDT-ERC20": {
      "currency": "USDT-ERC20",
      "logo": "",
      "balance": 0,
      "minWithdraw": 0.1,
      "maxWithdraw": 100000
    },
    "ETH": {
      "currency": "ETH",
      "logo": "",
      "balance": 0,
      "minWithdraw": 0.001,
      "maxWithdraw": 100000
    }
  }
}
```





### 5、回調  

#### 5.1 場景說明

本系統調用商戶提供的回調接口，通知商戶地址[查看](#1、生成地址)的充值和提現具體變化信息。

如果商戶提供的回調接口異常, 本平台將保存異常的回調. 同時, 商戶後台提供了重新發送失敗回調的功能, 可保證您的每筆充提都萬無一失

#### 5.2 接口詳情

##### 5.2.1 接口地址

|   接口詳情   |                                 |
| :----------: | :-----------------------------: |
|     URL      |                                 |
|   請求方式   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 5.2.2 參數

###### 5.2.2.1 參數說明

|      參數      |  類型  |          說明          |                             備註                             |
|:------------:| :----: | :--------------------: | :----------------------------------------------------------: |
|  timestamp   | String |    時間戳(系统时间)    |                            單位秒                            |
|   tradeId    | String |         交易ID         |             IB系統內部交易號, 與每筆充提一一對應             |
|  tradeType   | String |        交易類型        |    "DEPOSIT" : 充幣 ,  "WITHDRAW" : 提幣, 本參數非常重要     |
| merchantId   | String |    是    |    商户ID    |                    IB商户平台提供的商户id                    |
|     sign     | String |          簽名          | <font color=#ff9900 size=4>md5</font>規則如下,算法是32位小寫 |
|    amount    | String |          金額          |                        本參數較為重要                        |
|  businessId  | String |         業務Id         | 為提幣回調時,本參數是提幣接口傳入的<font color=#ff9900 size=4>businessId</font>中的唯一ID(可幫助商戶快速找到指定的提幣), 為充幣回調時,本參數是創建地址API填寫的<font color=#ff9900 size=4>businessId</font>, 本參數非常重要 |
|   currency   | Strin  |         幣種名         |                        本參數非常重要                        |
|    status    | String |          狀態          |    見 回調接口狀態說明[查看](#5.2.2.4  回調接口狀態說明)     |
|  toAddress   | String |        收款地址        | 充幣(<font color=#ff9900 size=4>tradeType</font>為"DEPOSIT")回調時, 本參數為商戶創建地址[查看](#1、生成地址)請求響應中的<font color=#ff9900 size=4>address</font>. 提幣(<font color=#ff9900 size=4>tradeType</font>為"WITHDRAW")回調時,本參數為提現[查看](#2、提幣)請求參數中的<font color=#ff9900 size=4>address</font>. 本參數較為重要 |
|     txid     | String |     區塊鏈交易哈希     | 區塊瀏覽器可通過本參數的值查詢到本交易(每筆交易都對應了一個txid), 本參數較為重要. 本參數可能為空, 為空時本參數為 ""(空字符串) |




將各個參數的值拼接後,對其進行<font color=#ff9900 size=4>md5</font> 32位加密, 得到<font color=#ff9900 size=4>sign</font>

**注意**: 參與<font color=#ff9900 size=4>md5</font>簽名計算的參數必須按照如下(ASCII順序表 + <font color=#ff9900 size=4>key</font>)順序拼接,否則會導致驗簽不匹配

<table>   <tr>     <td bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign=   md5(strtoupper(amount=50.45 & currency=TRX & merchantId=bYPhrixkgRX2KjJ4QJUp083v&status=3 & timestamp=1659425194 & toAddress=R343243 & tradeId=544542124545 & tradeType=withdraw & txid=4145451212 & key=ce413a4084db66ae8cca32a6ce8b2545))</font> </td>   </tr> </table>

注意: 計算<font color=#ff9900 size=4>sign</font>時, 如果某項參數為空, 則對應的值為 "", 而不是 "null" 或者 "  "



###### 5.2.2.2  回调请求示例

```json
{
  "merchantId" : "merchantId",
  "amount": "100",
  "businessId": "12412512",
  "currency": "DOGE",
  "status": "1",
  "txid": "0ae988306fdff6edcd3d0a7ebdffa4d12df2c13848a9ed790844ea05091ddb5a",
  "tradeId": "dd90909110ba40c6890e762992b8fc95",
  "tradeType": "WITHDRAW",
  "toAddress": "DKoWbr4oWGyZwDdYFbAG74nPtTdGsWon9G",
  "timestamp": "1601200800",
  "sign": "291332420a986cdb8119f24d880463e0"
}
```



###### 5.2.2.3  回调响应

只要商戶提供的回調接口返回 SUCCESS, 便視為回調發送成功. 如果回調發送失敗, 將會每10秒重發一次, 重新發送20次.



###### 5.2.2.4  回调接口状态说明

| 状态 |   說明   |
| :--: | :------: |
|  0   | 等待交易 |
|  1   |  交易中  |
|  2   |  拒绝审核  |
|  3   | 交易完成 |
|  4   | 交易失敗 |



### 6、商户代付余额

#### 6.1 场景说明

获取商户代付币种余额 + 代付手续费余额

#### 6.2 接口详情

##### 6.2.1 接口地址

|   接口详情   |                                 |
| :----------: |:-------------------------------:|
|     URL      |    【/api/v1/wallet/balance】     |
|   请求方式   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 6.2.2 参数

###### 6.2.2.1 参数说明

|    参数     |  类型  | 是否必填 |     说明     |                             备注                             |
| :---------: | :----: | :------: | :----------: | :----------------------------------------------------------: |
|  timestamp  | String |    是    |    时间戳    |                            单位秒                            |
|    nonce    | String |    是    |  随机字符串  |             长度<=64位(用途: 保证安全,防止破译)              |
|    sign     | String |    是    |     签名     | <font color=#ff9900 size=4>md5</font>规则如下, 算法是32位大写 |
| merchantId  | String |    是    |    商户ID    |                    IB商户平台提供的商户id                    |

将各个参数的值拼接后,对其进行<font color=#ff9900 size=4>md5</font> 32位加密, 得到<font color=#ff9900 size=4>sign</font>

**注意**: 参与<font color=#ff9900 size=4>md5</font>签名计算的参数必须按照如下(ASCII顺序表 + <font color=#ff9900 size=4>key</font>)顺序拼接,否则会导致验签不通过

###### 6.2.2.2 请求示例

```json
{
  "timestamp":"1662365903",
  "merchantId":"kjtGuT72nt1bhaX",
  "nonce":"84885646",
  "sign":"E79D54434530626129CBD2517CC613F3"
}
```

###### 6.2.2.3 响应示例

```json
{
  "status": "success",
  "code": 200,
  "data": [
    {
      "currency": "TRX", // 币种
      "deposit_fee": 0.015, // 入金手续费
      "withdraw_fee": 0.015, // 出金手续费
      "miner_fee": 10, // 矿工费
      "main_currency": "TRX", // 主币种
      "withdraw_balance": "0.000028", // 可提现余额
      "withdraw_fee_balance": "31.000000", // 可提现手续费
      "pay_balance": "0.000000", // 可代付余额
      "pay_fee_balance": "20.000000" // 可代付手续费
    },
    {
      "currency": "USDT-TRC20",
      "deposit_fee": 0.015,
      "withdraw_fee": 0.015,
      "miner_fee": 10,
      "main_currency": "TRX",
      "withdraw_balance": "2.068500",
      "withdraw_fee_balance": "31.000000",
      "pay_balance": "0.074900",
      "pay_fee_balance": "20.000000"
    }
  ]
}
```


### 附錄
##### 返回狀態碼

| code |                            解釋                            |
| :--: | :--------------------------------------------------------: |
| 200  |                            成功                            |
| 301  |                       幣種名不能為空                       |
| 303  |                  系統正在升級，請稍後重試                  |
| 401  |                          驗簽失敗                          |
| 500  |                          內部錯誤                          |
| 534  | 該地址已分配為您的商戶後台充幣地址, 請在商戶後台網站中查看 |
| 535  |                     提幣金額小於等於0                      |
| 536  |        提幣金額小於最小提幣限額, 或大於最大提幣限額        |
| 537  |              當日提幣金額大於當日最大提筆限額              |
| 538  |                    提幣金額大於可用餘額                    |
| 539  |         用戶地址數量達到上限，請先解鎖地址數量限制         |
| 545  |   提幣唯一ID已被提交,為避免商家誤操作,此次提幣不會被受理   |
| 555  |                    代付手续费额度不够                    |
| 550  |                        地址校驗失敗                        |
| 990  |    請求Content-Type不為application/json 或參數類型錯誤     |
