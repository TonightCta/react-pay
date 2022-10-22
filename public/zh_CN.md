
#### 注意

```json
1.接口授权码key，由系统分配给商户, 在IB商户后台获取. 接下来文档的key以 ce413a4084db66ae8cca32a6ce8b2545 为例
2.为兼容所有计算机语言,本系统接收的所有参数类型均为字符串(String)
```



### 1、生成地址

#### 1.1 场景说明

获取指定币种地址,  该地址与传入的<font color=#ff9900 size=4>businessId</font>(商户内部的用户名或订单号)绑定, 一是方便在商户后台通过此<font color=#ff9900 size=4>businessId</font>进行查账, 二是方便找回已经生成的地址.  经过此API生成的地址, 有资金入账时均会得到回调接口[查看](#5、回调)的通知.

**注意**:  商户账号可创建的地址数有上限, 测试阶段上限为10. 进入生产阶段前可联系客服,上限将升级至1000. 如需更多地址, 请联系客服处理

#### 1.2 接口详情

##### 1.2.1 接口地址

|   接口详情   |                                 |
| :----------: | :-----------------------------: |
|     URL      |   【/api/v1/wallet/create】    |
|   请求方式   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 1.2.2 参数

###### 1.2.2.1 参数说明

|     参数      |  类型  | 是否必填 |         说明          |                                    备注                                     |
|:-----------:| :----: | :------: |:-------------------:|:-------------------------------------------------------------------------:|
|  timestamp  | String |    是    |         时间戳         |                                    单位秒                                    |
|    nonce    | String |    是    |        随机字符串        |                          长度<=64位(用途: 保证安全,防止破译)                           |
|    sign     | String |    是    |         签名          |            <font color=#ff9900 size=4>md5</font>规则如下,算法是32位大写             |
| merchantId  | String |    是    |        商户ID         |                               IB商户平台提供的商户id                               |
| businessId  | String |    否    | 商户地址关联对象的唯一标识(地址别名) | 本参数与地址有关联, 当某值被首次传入时, 会生成全新地址(当某值被重复传入时,会返回之前的相同地址), 如果想要生成不同的地址, 请传入不同的值 |
| currency    | String |    是    |         币种名         |                       1.字母需大写 2.币种列表[查看](#4、获取币种列表)                       |
| notify_url  | String |    是    |      地址到账通知地址       |                                                                           |

将各个参数的值拼接后,对其进行<font color=#ff9900 size=4>md5</font> 32位加密, 得到<font color=#ff9900 size=4>sign</font>

**注意**: 参与<font color=#ff9900 size=4>md5</font>签名计算的参数必须按照如下(ASCII顺序表 + <font color=#ff9900 size=4>key</font>)顺序拼接,否则会导致验签不通过

<table>   <tr>     <td bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign= strtoupper(md5(businessId=1 & currency=TRX & merchantId=2SlSxZPmXqaHQrwkXonFs0Ce & nonce=17437263 & notify_url=https://aa.com/callback & timestamp=1659409578 & key=2e9070583f8767c6260aba8be3ff2088))</font> </td>   </tr> </table>

 例:  sign= strtoupper(md5(businessId=1 & currency=TRX & merchantId=2SlSxZPmXqaHQrwkXonFs0Ce & nonce=17437263 & notify_url=https://aa.com/callback & timestamp=1659409578 & key=2e9070583f8767c6260aba8be3ff2088))



XRP地址有特殊的规则, 以此地址为例: r3ReqczYCCc44pUxU9bmWauCSzJJoiy2oD|84399219

在生成的XRP地址中, "|"后面的 "84399219"为标签(memo) ,请截取保存

###### 1.2.2.2 请求示例

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

###### 1.2.2.3 正常响应示例

```json
{
  "code": "200",
  "data": {
        "address": "3F4jmZpP5VMoB7yWPmHZfQip3vm5detScx",    //地址
        "currency": "BTC"    //币种名
  },
  "message": "SUCCESS"
}
```

###### 1.2.2.4 异常响应示例  [查看](#返回状态码)

```json
{"code":"401","message":"Unauthorized","data":null}   //验签失败
```





### 2、提币 

#### 2.1 场景说明

提币, 可指定币种名和数量进行提币转账操作.   如果在传入的<font color=#ff9900 size=4>businessId</font>中拼接 商户内部的用户名或订单号 , 就可以商户后台通过商户内部的用户名或订单号进行查账.  调用此API后, 该笔提现状态变更时均会得到回调接口[查看](#5、回调)的通知.

#### 2.2 接口详情

##### 2.2.1 接口地址

|   接口详情   |                                 |
| :----------: | :-----------------------------: |
|     URL      |      【/api/v1/wallet/withdraw】       |
|   请求方式   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 2.2.2 参数

###### 2.2.2.1 参数说明

|    参数    |  类型  | 是否必填 |                 说明                 |                             备注                             |
| :--------: | :----: | :------: | :----------------------------------: | :----------------------------------------------------------: |
| timestamp  | String |    是    |                时间戳                |                            单位秒                            |
|   nonce    | String |    是    |              随机字符串              |             长度<=64位(用途: 保证安全,防止破译)              |
|    sign    | String |    是    |                 签名                 | <font color=#ff9900 size=4>md5</font>规则如下,算法是32位大写 |
| merchantId | String |    是    |                商户ID                |                    IB商户平台提供的商户id                    |
|  address   | String |    是    |               提币地址               |                                                              |
|   amount   | String |    是    |               提币数量               |                                                              |
|  currency  | String |    是    |                币种名                |         字母需大写, 币种列表[查看](#4、获取币种列表)         |
| businessId | String |    是    | "商户内部用户名或订单名" 拼接 唯一ID |                 长度<=64, 详细规则在表格下方                 |
|    memo    | String |    否    |                 备注                 |          XRP的提币申请该字段可选，其他类型币种不填           |
| notify_url  | String |    是    |      地址到账通知地址       |                                                                           |

关于<font color=#ff9900 size=4>businessId</font>参数:

1.如果有用户名/订单号需求, <font color=#ff9900 size=4>businessId</font> 可传用户名或订单号 + "&"+唯一ID( 唯一ID不含 "&"符号, 必须保证该字段唯一, 如果重复，则该提现不会被处理, 唯一ID可保证一笔提现不会因商户错误操作或者网络问题, 被转账两次).    例: xiaoming&2354912701

2.如果不想填入用户名或订单号,  <font color=#ff9900 size=4>businessId</font> 请直接传入唯一ID( 唯一ID不含 "&"符号, 必须保证该字段唯一, 如果重复，则该提现不会被处理, 唯一ID可保证一笔提现不会因商户错误操作或者网络问题, 被转账两次), 例: 2354912701

3.唯一ID ,例: 2354912701, 将在提币回调中 , 在<font color=#ff9900 size=4>businessId</font>字段中返回, 帮助商家跟踪该笔提币的状态

4.此<font color=#ff9900 size=4>businessId</font>与 创建地址[查看](#1、生成地址)的<font color=#ff9900 size=4>businessId</font>并无关联



将各个参数的值拼接后,对其进行<font color=#ff9900 size=4>md5</font> 32位加密, 得到<font color=#ff9900 size=4>sign</font>

**注意**: 参与<font color=#ff9900 size=4>md5</font>签名计算的参数必须按照如下(ASCII顺序表 + <font color=#ff9900 size=4>key</font>)顺序拼接,否则会导致验签不通过

<table>   <tr>     <td bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign=  strtoupper(md5( address = TCLDvRhRgtjBhHuNJZhBnnSG7A3RiqGEya&amount=1 & businessId=TEST2022080211205887199 & currency=USDT-TRC20 & merchantId=bYPhrixkgRX2KjJ4QJUp083v&nonce=26831146 & notify_url=https://aa.com/callback&timestamp=1659410458 & key=ce413a4084db66ae8cca32a6ce8b2545 ))</font> </td>   </tr> </table>

例:strtoupper(md5( address = TCLDvRhRgtjBhHuNJZhBnnSG7A3RiqGEya&amount=1 & businessId=TEST2022080211205887199 & currency=USDT-TRC20 & merchantId=bYPhrixkgRX2KjJ4QJUp083v&nonce=26831146 & notify_url=https://aa.com/callback&timestamp=1659410458 & key=ce413a4084db66ae8cca32a6ce8b2545 ))

###### 2.2.2.2 请求示例

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





###### 2.2.2.3 正常响应示例 

```json
{
  "code": "200",
  "message": "SUCCESS"
}
```

###### 2.2.2.4 异常响应示例  [查看](#返回状态码)

```json
{
  "code": "545",
  "message": "The unique transfer ID has been submitted. To avoid maloperation of the commercial tenant, the transfer cannot be handled.", //提币唯一ID已被提交,为避免商家误操作,此次提币不会被受理
  "data": null
}
```





### 3、校验地址

#### 3.1 场景说明

可校验各个币种的地址格式是否符合正确.  本接口不是必需接口, 可酌情接入.

用例: 用户在商户自家平台进行提币操作, 填写了币种:BTC, 地址:11111,  商户调用本接口, 便可知道用户填写的地址格式错误, 方便提醒用户.

#### 3.2 接口详情

##### 3.2.1 接口地址

|   接口详情   |                                 |
| :----------: | :-----------------------------: |
|     URL      |    【/api/v1/wallet/valid】     |
|   请求方式   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 3.2.2 参数

###### 3.2.2.1 参数说明

|    参数    |  类型  | 是否必填 |    说明    |                             备注                             |
| :--------: | :----: | :------: | :--------: | :----------------------------------------------------------: |
| timestamp  | String |    是    |   时间戳   |                            单位秒                            |
|   nonce    | String |    是    | 随机字符串 |             长度<=64位(用途: 保证安全,防止破译)              |
|    sign    | String |    是    |    签名    | <font color=#ff9900 size=4>md5</font>规则如下,算法是32位大写 |
| merchantId | String |    是    |   商户ID   |                    IB商户平台提供的商户id                    |
|  address   | String |    是    |    地址    |                                                              |
|  currency  | String |    是    |   币种名   |                                                              |



将各个参数的值拼接后,对其进行<font color=#ff9900 size=4>md5</font> 32位加密, 得到<font color=#ff9900 size=4>sign</font>

**注意**: 参与<font color=#ff9900 size=4>md5</font>签名计算的参数必须按照如下(ASCII顺序表 + <font color=#ff9900 size=4>key</font>)顺序拼接,否则会导致验签不通过

<table>   <tr>     <td bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign=   strtoupper(md5(address = TRdJQgXyiUoSfJmzhvJ3u1sfS6nTdnzetz & currency=TRX & merchantId=bYPhrixkgRX2KjJ4QJUp083v & nonce=65774377 & timestamp=1659410974 & key=ce413a4084db66ae8cca32a6ce8b2545))</font> </td>   </tr> </table>

例: sign= strtoupper(md5(address = TRdJQgXyiUoSfJmzhvJ3u1sfS6nTdnzetz & currency=TRX & merchantId=bYPhrixkgRX2KjJ4QJUp083v & nonce=65774377 & timestamp=1659410974 & key=ce413a4084db66ae8cca32a6ce8b2545))

###### 3.2.2.2 请求示例

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

###### 3.2.2.3 成功响应示例

```json
{
  "code": "200",
  "message": "SUCCESS"
}
```

###### 3.2.2.4 异常响应示例  [查看](#返回状态码)

```json
{
  "code": "550",
  "message": "ADDRESS ERROR", //地址校验不通过
  "data": null
}
```





### 4、获取币种列表

#### 4.1 场景说明

可获取所有币种列表,  甚至可以获取到商户每个币种的余额

#### 4.2 接口详情

##### 4.2.1 接口地址

|   接口详情   |                                 |
| :----------: | :-----------------------------: |
|     URL      |      【/api/v1/wallet/supportCoins】       |
|   请求方式   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 4.2.2 参数

###### 4.2.2.1 参数说明

|    参数     |  类型  | 是否必填 |     说明     |                             备注                             |
| :---------: | :----: | :------: | :----------: | :----------------------------------------------------------: |
|  timestamp  | String |    是    |    时间戳    |                            单位秒                            |
|    nonce    | String |    是    |  随机字符串  |             长度<=64位(用途: 保证安全,防止破译)              |
|    sign     | String |    是    |     签名     | <font color=#ff9900 size=4>md5</font>规则如下, 算法是32位大写 |
| merchantId  | String |    是    |    商户ID    |                    IB商户平台提供的商户id                    |

将各个参数的值拼接后,对其进行<font color=#ff9900 size=4>md5</font> 32位加密, 得到<font color=#ff9900 size=4>sign</font>

**注意**: 参与<font color=#ff9900 size=4>md5</font>签名计算的参数必须按照如下(ASCII顺序表 + <font color=#ff9900 size=4>key</font>)顺序拼接,否则会导致验签不通过

<table > <tr>  <td  bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign=  strtoupper(md5(merchantId = bYPhrixkgRX2KjJ4QJUp083v & nonce=59801214 & timestamp=1659411403 & key=ce413a4084db66ae8cca32a6ce8b2545))</font> </td>  </tr> </table>

例: sign= strtoupper(md5(merchantId = bYPhrixkgRX2KjJ4QJUp083v & nonce=59801214 & timestamp=1659411403 & key=ce413a4084db66ae8cca32a6ce8b2545))

###### 4.2.2.2 请求示例

```json
{
  "timestamp": "1598928950",
  "nonce": "2355",
  "sign": "507ba9d74c5d2ab6f8979907966dc627",
  "merchantId": "2008250539582990000"
}
```

###### 4.2.2.3 响应示例

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






### 5、回调  

#### 5.1 场景说明

本系统调用商户提供的回调接口，通知商户地址[查看](#1、生成地址)的充值和提现具体变化信息。

如果商户提供的回调接口异常, 本平台将保存异常的回调. 同时, 商户后台提供了重新发送失败回调的功能, 可保证您的每笔充提都万无一失

#### 5.2 接口详情

##### 5.2.1 接口地址

|   接口详情   |                                 |
| :----------: | :-----------------------------: |
|     URL      |                                 |
|   请求方式   |              POST               |
| Content-Type | application/json; charset=utf-8 |

##### 5.2.2 参数

###### 5.2.2.1 参数说明

|      参数      |  类型  |          说明          |                             备注                             |
|:------------:| :----: | :--------------------: | :----------------------------------------------------------: |
|  timestamp   | String |    时间戳(系统时间)    |                            单位秒                            |
|   tradeId    | String |         交易ID         |             IB系统内部交易号, 与每笔充提一一对应             |
|  tradeType   | String |        交易类型        |    "DEPOSIT" : 充币 ,  "WITHDRAW" : 提币, 本参数非常重要     |
| merchantId   | String |    是    |    商户ID    |                    IB商户平台提供的商户id                    |
|   currency   | Strin  |         币种名         |                        本参数非常重要                        |
|    amount    | String |          金额          |                        本参数较为重要                        |
|    status    | String |          状态          |    见 回调接口状态说明[查看](#5.2.2.4  回调接口状态说明)     |
|  toAddress   | String |        收款地址        | 充币(<font color=#ff9900 size=4>tradeType</font>为"DEPOSIT")回调时, 本参数为商户创建地址[查看](#1、生成地址)请求响应中的<font color=#ff9900 size=4>address</font>.   提币(<font color=#ff9900 size=4>tradeType</font>为"WITHDRAW")回调时,本参数为提现[查看](#2、提币)请求参数中的<font color=#ff9900 size=4>address</font>.  本参数较为重要 |
|     txid     | String |     区块链交易哈希     | 区块浏览器可通过本参数的值查询到本交易(每笔交易都对应了一个txid), 本参数较为重要.  本参数可能为空, 为空时本参数为  ""(空字符串) |
|     sign     | String |          签名          | <font color=#ff9900 size=4>md5</font>规则如下,算法是32位大写 |
|  businessId  | String |         业务Id         | 为提币回调时,本参数是提币接口传入的<font color=#ff9900 size=4>businessId</font>中的唯一ID(可帮助商户快速找到指定的提币), 为充币回调时,本参数是创建地址API填写的<font color=#ff9900 size=4>businessId</font>, 本参数非常重要 |



将各个参数的值拼接后,对其进行<font color=#ff9900 size=4>md5</font> 32位加密, 得到<font color=#ff9900 size=4>sign</font>

**注意**: 参与<font color=#ff9900 size=4>md5</font>签名计算的参数必须按照如下(ASCII顺序表 + <font color=#ff9900 size=4>key</font>)顺序拼接,否则会导致验签不匹配

<table>   <tr>     <td bgcolor=#1c1d21> <font color=#FFFFFF size=3> sign=   md5(strtoupper(amount=50.45 & currency=TRX & merchantId=bYPhrixkgRX2KjJ4QJUp083v&status=3 & timestamp=1659425194 & toAddress=R343243 & tradeId=544542124545 & tradeType=withdraw & txid=4145451212 & key=ce413a4084db66ae8cca32a6ce8b2545))</font> </td>   </tr> </table>

注意: 计算<font color=#ff9900 size=4>sign</font>时, 如果某项参数为空, 则对应的值为 "", 而不是 "null" 或者 "  "



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

只要商户提供的回调接口响应 'SUCCESS', 便视为回调发送成功.   如果回调发送失败, 将会每10秒重发一次, 重新发送20次.



###### 5.2.2.4  回调接口状态说明

| 状态 |   说明   |
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



### 附录
##### 返回状态码

| code |                            解释                            |
| :--: | :--------------------------------------------------------: |
| 200  |                            成功                            |
| 301  |                       币种名不能为空                       |
| 303  |                  系统正在升级，请稍后重试                  |
| 401  |                          验签失败                          |
| 500  |                          内部错误                          |
| 534  | 该地址已分配为您的商户后台充币地址, 请在商户后台网站中查看 |
| 535  |                     提币金额小于等于0                      |
| 536  |        提币金额小于最小提币限额, 或大于最大提币限额        |
| 537  |              当日提币金额大于当日最大提笔限额              |
| 538  |                    提币金额大于可用余额                    |
| 539  |         用户地址数量达到上限，请先解锁地址数量限制         |
| 545  |   提币唯一ID已被提交,为避免商家误操作,此次提币不会被受理   |
| 555  |                    代付手续费额度不够                    |
| 550  |                        地址校验失败                        |
| 990  |    请求Content-Type不为application/json 或参数类型错误     |
