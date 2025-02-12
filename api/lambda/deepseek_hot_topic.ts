/**
 * 获取趋势向上的股票信息(历史日行情k线数据
 */
import axios from "axios";
interface IParams {
  stocks: Array<string>;
  hotTopic: Array<string>;
}

const DEEPSEEK_API_TOKEN = '8NxukzSwAXUDDzZmmFI1nIZCTAWls1Y3xP2woG9tAIbyjlr9vCX9R9N8sr1tUPlm';
export const get = async ({}: IParams) => {
  // "conversation_id": "44d8f586-ed2c-4685-b154-40555ce4f8d6@2",
  axios.post("http://127.0.0.1:8000/v1/chat/completions", {
      "model": "deepseek-r1-silent",
      "messages": [
          {"role": "system", "content": "你是一个分析中国A股上市公司相关业务及其涉及概念热点题材的助手。给出的答案回复仅需要返回JSON数据即可。"},
          {
              "role": "user",
              "content": "上市公司：达实智能、中辰股份、双乐股份、冠盛股份、香山股份。请详细描述各个上市公司核心业务和涉及的概念、热点、题材。回复中仅返回JSON（无需返回json字样），数据格式参考如下: [{name: \"达实智能\", hot_topic: [], core_business: \"\"}], name字段为公司名称, hot_topic数组字段为涉及的概念热点题材，core_business字段为核心业务描述。"
          }
      ],
      "conversation_id": "c71b84f8-0e7a-48cd-b067-c3e156ec3b50@2",
      "stream": false
  }, {
    headers: {
      Authorization: `Bearer ${DEEPSEEK_API_TOKEN}`,
    },
  })
}
