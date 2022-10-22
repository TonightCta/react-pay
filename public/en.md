
#### Notes

```json
1.The interface authorization code is key. The code is assigned to the commercial tenant by the system, and the IB commercial tenant gets the 
  code from the background. Next, the document – "key" takes ce413a4084db66ae8cca32a6ce8b2545 as an example.
2.The system is compatible with all computer languages. All parameter types received by the system is "String".
```



### 1.Generated address

#### 1.1 Scene description

The designated currency address is obtained, and the address binds with the <font color=#ff9900 size=4>businessId</font> (username or order number in the commercial tenant), which is convenient to check accounts at the background of commercial tenants through <font color=#ff9900 size=4>businessId</font>, and is also convenient to generate address through API. When the funds are recorded at the address generated through API, the notice of the callback interface will be received [view](#5callback)

**Note**: There is an upper limit on the number of addresses that can be created for a merchant account, and the upper limit in the testing phase is 10. You can contact customer service before entering the production stage, and the upper limit will be upgraded to 1000. For more addresses, please contact customer service

#### 1.2 Interface details

##### 1.2.1 Interface address

|   Interface details   |                                 |
| :----------: | :-----------------------------: |
|     URL      |   【/api/v1/wallet/create】    |
|   Request method   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 1.2.2 Parameters

###### 1.2.2.1 Description on parameters

|    Parameters    |  Type  | Required or not |                 Description                 |                             Remarks                              |
| :--------: | :----: | :------: | :----------------------------------: | :----------------------------------------------------------: |
| timestamp  | String |    Yes    |               Timestamp                |                            Unit: seconds                            |
|   nonce    | String |    Yes    |              Random string              |             Length <=64 (application: ensure safety and avoid decoding)              |
|    sign    | String |    Yes    |                 Signature                 |                  <font color=#ff9900 size=4>md5</font> rules are as follows. The algorithm is 32-digit lower case                  |
| merchantId | String |    Yes    |                Commercial tenant ID              |                    Commercial tenant id provided by IB commercial tenant platform                    |
| businessId | String |    No    | Unique identification for association object of commercial tenant address (address alias) | The parameter is associated with the address. When some value is firstly uploaded, new address generates (when some value is uploaded in a repeated way, return to the same previous address). If different address is required, please upload different values.  |
|  currency  | String |    Yes    |                Currency name                |       1.The letter shall be upper case 2.currency list[view](#4obtain-currency-list)        |
| notify_url |  String  |    Yes    |   Address of notice of arrival    |                                                                           |

After splicing various parameter values, encrypt <font color=#ff9900 size=4>md5</font> 32 digits and get <font color=#ff9900 size=4>sign</font>.

**Note**: the parameter for <font color=#ff9900 size=4>md5</font> signature calculation shall be spliced as follows (ASCII sequence list + <font color=#ff9900 size=4>key</font>), otherwise, signature verification will fail 

<table>   <tr>     <td bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign= strtoupper(md5(businessId=1 & currency=TRX & merchantId=2SlSxZPmXqaHQrwkXonFs0Ce & nonce=17437263 & notify_url=https://aa.com/callback & timestamp=1659409578 & key=2e9070583f8767c6260aba8be3ff2088))</font> </td>   </tr> </table>

 For example:  sign= strtoupper(md5(businessId=1 & currency=TRX & merchantId=2SlSxZPmXqaHQrwkXonFs0Ce & nonce=17437263 & notify_url=https://aa.com/callback & timestamp=1659409578 & key=2e9070583f8767c6260aba8be3ff2088))



XRP address has special rules. Take the address as an example: r3ReqczYCCc44pUxU9bmWauCSzJJoiy2oD|84399219

In the XRP address generated, "84399219" after "|" is memo, please intercept and save.

###### 1.2.2.2 Request examples

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

###### 1.2.2.3 Normal response examples

```json
{
  "code": "200",
  "data": {
        "address": "3F4jmZpP5VMoB7yWPmHZfQip3vm5detScx",    //address
        "currency": "BTC"    //currency name
  },
  "message": "SUCCESS"
}
```

###### 1.2.2.4 Abnormal response example  [view](#5224--callback-interface-status-description)

```json
{"code":"401","message":"Unauthorized","data":null}   //signature verification false
```





### 2.Transfer 

#### 2.1 Scene description

Transfer refers to transfer of assigned currency name and quantity. If username or order number in the commercial tenant are spliced in the uploaded <font color=#ff9900 size=4>businessId</font>, accounts can be checked through username or order number of the commercial tenant in the background. After the API is called, the notice of callback interface will be received when the withdrawal status changes.[view](#5callback)

#### 2.2 Interface details

##### 2.2.1 Interface address

|   Interface details   |                                 |
| :----------: | :-----------------------------: |
|     URL      |      【/api/v1/wallet/withdraw】       |
|   Request method   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 2.2.2 Parameters

###### 2.2.2.1 Description on parameters

|    Parameters    |  Type  | Required or not |                 Description                 |                     Remarks                      |
| :--------: | :----: |:---------------:| :----------------------------------: | :------------------------------------------: |
| timestamp  | String |       Yes       |                Timestamp                |                    Unit: seconds                    |
|   nonce    | String |       Yes       |              Random string              |     Length <=64 (application: ensure safety and avoid decoding)      |
|    sign    | String |       Yes       |                 Signature                 |          <font color=#ff9900 size=4>md5</font> rules are as follows. The algorithm is 32-digit lower case          |
| merchantId | String |       Yes       |                Commercial tenant ID                |            Commercial tenant id provided by IB commercial tenant platform            |
|  address   | String |       Yes       |               Transfer address               |                                              |
|   amount   | String |       Yes       |               Transfer quantity               |                                              |
|  currency  | String |       Yes       |                Currency name                | The letter shall be upper case,  Currency list[view](#4obtain-currency-list) |
| businessId | String |       Yes       | “commercial tenant username or order name” splice the unique ID |         Length <=64, the detailed rules are below the table         |
|    memo    | String |       No        |                 Remarks                  |  XRP transfer application:the field is optional, and other types of currency is not required.    |
| notify_url |  String  |       Yes       |   Address of notice of arrival    |                                                                           |


<font color=#ff9900 size=4>businessId</font> parameter:

1.If there are needs of user name/order number, <font color=#ff9900 size=4>businessId</font> can upload username or order number  + "&"+ unique ID (unique ID does not include  "&"; it is necessary to ensure unique field; if there is any repetition, the transfer cannot be handled; unique ID can ensure that one transfer cannot be transferred twice due to commercial tenant maloperation or network problem).     For example: xiaoming&2354912701

2.If you don’t want to fill in username or order number, <font color=#ff9900 size=4>businessId</font> can directly upload the unique ID (unique ID does not include "&"; it is necessary to ensure unique field; if there is any repetition, the transfer cannot be handled; unique ID can ensure that one transfer cannot be transferred twice due to commercial tenant maloperation or network problem).     For example: xiaoming&2354912701

3.The unique ID, such as 2354912701, will be in the transfer call-back, return in the <font color=#ff9900 size=4>businessId</font> field and help the commercial tenant to track the transfer status.

4.The <font color=#ff9900 size=4>businessId</font> is not associated with <font color=#ff9900 size=4>businessId</font> of the address created[view](#1generated-address).



After splicing various parameter values, encrypt <font color=#ff9900 size=4>md5</font> 32 digits and get <font color=#ff9900 size=4>sign</font>.

**Note**: the parameter for <font color=#ff9900 size=4>md5</font> signature calculation shall be spliced as follows (ASCII sequence list + <font color=#ff9900 size=4>key</font>), otherwise, signature verification will fail 

<table>   <tr>     <td bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign=  strtoupper(md5( address = TCLDvRhRgtjBhHuNJZhBnnSG7A3RiqGEya&amount=1 & businessId=TEST2022080211205887199 & currency=USDT-TRC20 & merchantId=bYPhrixkgRX2KjJ4QJUp083v&nonce=26831146 & notify_url=https://aa.com/callback&timestamp=1659410458 & key=ce413a4084db66ae8cca32a6ce8b2545 ))</font> </td>   </tr> </table>

For example: strtoupper(md5( address = TCLDvRhRgtjBhHuNJZhBnnSG7A3RiqGEya&amount=1 & businessId=TEST2022080211205887199 & currency=USDT-TRC20 & merchantId=bYPhrixkgRX2KjJ4QJUp083v&nonce=26831146 & notify_url=https://aa.com/callback&timestamp=1659410458 & key=ce413a4084db66ae8cca32a6ce8b2545 ))

###### 2.2.2.2 Request examples

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



When <font color=#ff9900 size=4>memo</font> parameter is not filled:

<table>   <tr>     <td bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign=  md5(address + amount + businessId + currency + merchantId + nonce + timestamp+ key)</font> </td>   </tr> </table>

For example: md5(r3ReqczYCCc44pUxU9bmWauCSzJJoiy2oD0.2sdf4sd0aXRP200825053958299000022221598928950ce413a4084db66ae8cca32a6ce8b2545)

Request examples:

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
  "memo": ""   //memo parameter is even not uploaded 
}
```



###### 2.2.2.3 Normal response examples 

```json
{
  "code": "200",
  "message": "SUCCESS"
}
```

###### 2.2.2.4 Abnormal response example  [view](#5224--callback-interface-status-description)

```json
{
  "code": "545",
  "message": "Unique ID of the transfer has been submitted; to avoid maloperation. The transfer will not be handled",
  "data": null
}
```





### 3.Address check

#### 3.1 Scene description

Verify whether various currency address formats are correct. The interface is not required, and the access is optional.

Use case: user can transfer at the commercial tenant platform, fill in the currency: BTC, address: 11111. The commercial tenant calls the interface, which is convenient to know address format error filled by the user and easy to remind users.

#### 3.2 Interface details

##### 3.2.1 Interface address

|   Interface details   |                                 |
| :----------: | :-----------------------------: |
|     URL      |    【/api/v1/wallet/valid】     |
|   Request method   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 3.2.2 Parameters

###### 3.2.2.1 Description on parameters

|    Parameters    |  Type  | Required or not |    Description    |                Remarks                  |
| :--------: | :----: | :------: | :--------: | :---------------------------------: |
| timestamp  | String |    Yes    |   Timestamp   |               Unit: seconds                |
|   nonce    | String |    Yes    | Random string | Length <=64 (application: ensure safety and avoid decoding) |
|    sign    | String |    Yes    |    Signature    | <font color=#ff9900 size=4>md5</font> rules are as follows. The algorithm is 32-digit lower case |
| merchantId | String |    Yes    |   Commercial tenant ID   |       Commercial tenant id provided by IB commercial tenant platform        |
|  address   | String |    Yes    |    Address    |                                     |
|  currency  | String |    Yes    |   Currency name   |                                     |



After splicing various parameter values, encrypt <font color=#ff9900 size=4>md5</font> 32 digits and get <font color=#ff9900 size=4>sign</font>.

**Note**: the parameter for <font color=#ff9900 size=4>md5</font> signature calculation shall be spliced as follows (ASCII sequence list + <font color=#ff9900 size=4>key</font>), otherwise, signature verification will fail 

<table>   <tr>     <td bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign=   strtoupper(md5(address = TRdJQgXyiUoSfJmzhvJ3u1sfS6nTdnzetz & currency=TRX & merchantId=bYPhrixkgRX2KjJ4QJUp083v & nonce=65774377 & timestamp=1659410974 & key=ce413a4084db66ae8cca32a6ce8b2545))</font> </td>   </tr> </table>

For example: sign= strtoupper(md5(address = TRdJQgXyiUoSfJmzhvJ3u1sfS6nTdnzetz & currency=TRX & merchantId=bYPhrixkgRX2KjJ4QJUp083v & nonce=65774377 & timestamp=1659410974 & key=ce413a4084db66ae8cca32a6ce8b2545))

###### 3.2.2.2 Request examples

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

###### 3.2.2.3 Success response examples

```json
{
  "code": "200",
  "message": "SUCCESS"
}
```

###### 3.2.2.4 Abnormal response example  [view](#5224--callback-interface-status-description)

```json
{
  "code": "550",
  "message": "address check fails",
  "data": null
}
```





### 4.Obtain currency list

#### 4.1 Scene description

Obtain all currency list, and even obtain every currency balance of the commercial tenant.

#### 4.2 Interface details

##### 4.2.1 Interface address

|   Interface details   |                                 |
| :----------: | :-----------------------------: |
|     URL      |      【/api/v1/wallet/supportCoins】       |
|   Request method   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 4.2.2 Parameters

###### 4.2.2.1 Description on parameters

|    Parameters     |  Type  | Required or not |     Description     |                Remarks                  |
| :---------: | :----: | :------: | :----------: | :---------------------------------: |
|  timestamp  | String |    Yes    |    Timestamp    |               Unit: seconds                |
|    nonce    | String |    Yes    |  Random string  | Length <=64 (application: ensure safety and avoid decoding) |
|    sign     | String |    Yes    |     Signature     | <font color=#ff9900 size=4>md5</font> rules are as follows. The algorithm is 32-digit lower case |
| merchantId  | String |    Yes    |    Commercial tenant ID    |       Commercial tenant id provided by IB commercial tenant platform        |

After splicing various parameter values, encrypt <font color=#ff9900 size=4>md5</font> 32 digits and get <font color=#ff9900 size=4>sign</font>.

**Note**: the parameter for <font color=#ff9900 size=4>md5</font> signature calculation shall be spliced as follows (ASCII sequence list + <font color=#ff9900 size=4>key</font>), otherwise, signature verification will fail 

<table > <tr>  <td  bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign=  strtoupper(md5(merchantId = bYPhrixkgRX2KjJ4QJUp083v & nonce=59801214 & timestamp=1659411403 & key=ce413a4084db66ae8cca32a6ce8b2545))</font> </td>  </tr> </table>

For example: sign= strtoupper(md5(merchantId = bYPhrixkgRX2KjJ4QJUp083v & nonce=59801214 & timestamp=1659411403 & key=ce413a4084db66ae8cca32a6ce8b2545))

###### 4.2.2.2 Request examples

```json
{
  "timestamp": "1598928950",
  "nonce": "2355",
  "sign": "507ba9d74c5d2ab6f8979907966dc627",
  "merchantId": "2008250539582990000"
}
```

###### 4.2.2.3 Response examples

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





### 5.Callback

#### 5.1 Scene description

The system calls the call-back interface provided by the commercial tenant, informs the charging and withdrawal changes at the commercial tenant address[view](#1generated-address)

If callback interface provided by the commercial tenant is abnormal, the platform will save abnormal callback. Meanwhile, the commercial tenant background provides the callback function - revalidation failed and ensures that each charging and withdrawal are safe.

#### 5.2 Interface details

##### 5.2.1 Interface address

|   Interface details   |                                 |
| :----------: | :-----------------------------: |
|     URL      |                                 |
|   Request method   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 5.2.2 Parameters

###### 5.2.2.1 Description on parameters

| Parameters |  Type  |          Description          |                             Remarks                              |
|:----------:| :----: | :--------------------: | :----------------------------------------------------------: |
| timestamp  | String |    Timestamp(system time)    |                            Unit: seconds                            |
|    sign    | String |          Signature          |                  <font color=#ff9900 size=4>md5</font> rules are as follows. The algorithm is 32-digit lower case                  |
|   amount   | String |          Balance          |                        The parameter is quite significant.                        |
| businessId | String |         BusinessId         | For transfer callback, the parameter is the unique ID to upload the <font color=#ff9900 size=4>businessId</font> from the transfer interface (help the commercial tenant to rapidly find the assigned transfer). For charging callback, the parameter is <font color=#ff9900 size=4>businessId</font> to create the address API, and the parameter is quite significant. |
| merchantId | String |    Yes    |    Commercial tenant ID    |       Commercial tenant id provided by IB commercial tenant platform        |
|  currency  | Strin  |         Currency name         |                        The parameter is quite significant.                        |
|   status   | String |          Status          |      Refer to callback interface status description.[view](#5224--callback-interface-status-description)     |
| toAddress  | String |        Receiving address        | For transfer (<font color=#ff9900 size=4>tradeType</font> is "DEPOSIT") callback, the parameter is <font color=#ff9900 size=4>address</font> in the request response of  <font color=#ff9900 size=4>"Generated address"</font>[view](#1generated-address).For transfer (<font color=#ff9900 size=4>tradeType</font> is "WITHDRAW") callback, the parameter is <font color=#ff9900 size=4>address</font> in the "withdrawal"[view](#2transfer) request parameters. The parameter is quite significant. |
|  tradeId   | String |         Transaction ID         |             The transaction number in the IB system corresponds to every charging and withdrawal.             |
| tradeType  | String |        Transaction type        |    "DEPOSIT": charging, "WITHDRAW": transfer, the parameter is quite significant.     |
|    txid    | String |     Blockchain transaction      | The blockchain browser can query for the transaction through the parameter value (every transaction corresponds to one txid). The parameter is quite significant. The parameter may be null. If the parameter is null, the parameter is “” (null character string). |



After splicing various parameter values, encrypt <font color=#ff9900 size=4>md5</font> 32 digits and get <font color=#ff9900 size=4>sign</font>.

**Note**: the parameter for <font color=#ff9900 size=4>md5</font> signature calculation shall be spliced as follows (ASCII sequence list + <font color=#ff9900 size=4>key</font>), otherwise, signature verification will fail 

<table>   <tr>     <td bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign=   md5(strtoupper(amount=50.45 & currency=TRX & merchantId=bYPhrixkgRX2KjJ4QJUp083v&status=3 & timestamp=1659425194 & toAddress=R343243 & tradeId=544542124545 & tradeType=withdraw & txid=4145451212 & key=ce413a4084db66ae8cca32a6ce8b2545))</font> </td>   </tr> </table>

Note: when <font color=#ff9900 size=4>key</font> is calculated, if some parameter is null, the corresponding value is "", but not "null" or " ". 



###### 5.2.2.2  Callback request examples

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



###### 5.2.2.3  Callback response

If the status code of the callback interface response 'SUCCESS', the callback sending is successful. If the callback sending fails, re-send every 10 seconds for 20 times.



###### 5.2.2.4  Callback interface status description

| Status |   Description   |
| :--: | :------: |
|  0   | Waiting for transaction |
|  1   |  In transaction  |
|  2   |  Reject  |
|  3   | Transaction completes |
|  4   | Transaction ends |



### 6Merchant-balance

#### 6.1 Scene Description:

Obtain the payment currency balance of the merchant & Balance of commission paid


#### 6.2 Interface details

##### 6.2.1 Interface address

| Interface details |                                 |
|:-----------------:|:-------------------------------:|
|        URL        |    【/api/v1/wallet/balance】     |
|      METHOD       |              POST               |
|   Content-Type    | application/json; charset=utf-8 |

##### 6.2.2 Params

###### 6.2.2.1 Desc

| Parameters |  Type  |          Description          |                             Remarks                              |
|:----------:| :----: | :--------------------: | :----------------------------------------------------------: |
| timestamp  | String |    Timestamp(system time)    |                            Unit: seconds                            |
|    nonce    | String |    Yes    |  Random string  | Length <=64 (application: ensure safety and avoid decoding) |
| merchantId | String |    Yes    |    Commercial tenant ID    |       Commercial tenant id provided by IB commercial tenant platform        |
|    sign    | String |          Signature          |                  <font color=#ff9900 size=4>md5</font> rules are as follows. The algorithm is 32-digit lower case                  |


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
      "currency": "TRX", // currency
      "deposit_fee": 0.015, // deposit fee
      "withdraw_fee": 0.015, // withdraw fee
      "miner_fee": 10, // miner fee
      "main_currency": "TRX", // main currency
      "withdraw_balance": "0.000028", // withdraw balance
      "withdraw_fee_balance": "31.000000", // withdraw fee balance
      "pay_balance": "0.000000", // pay balance
      "pay_fee_balance": "20.000000" // pay fee balance
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


### Appendix
##### Return state code

| code |                            Interpretation                            |
| :--: | :--------------------------------------------------------: |
| 200  |                            Success                            |
| 301  |                       The currency name cannot be null.                       |
| 303  |                  The system is upgrading. Please try again later.                  |
| 401  |                          Signature verification fails.                          |
| 500  |                          Internal error.                          |
| 534  | The address has been assigned to charging address of your commercial tenant background. The address can be viesed in the commercial tenant background website. |
| 535  |                    The transfer amount is less than or equal to 0.                       |
| 536  |        The transfer amount is less than minimum transfer limit or greater than maximum transfer limit.        |
| 537  |              The transfer amount is greater than maximum transfer limit on the day.              |
| 538  |                    The transfer amount is greater than available balance.                    |
| 539  |         If the user address quantity reaches the upper limit, please unlock the address quantity limit.         |
| 545  |   The unique transfer ID has been submitted. To avoid maloperation of the commercial tenant, the transfer cannot be handled.   |
| 550  |                        Address verification fails                        |
| 555  |                    The amount of commission paid on behalf is insufficient                    |
| 990  |    Request Content-Type not application/json or parameter type error     |
