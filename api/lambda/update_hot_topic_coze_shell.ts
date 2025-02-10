import fs from "fs";
import path from 'path';
import _ from "lodash-es";
import {
  CozeAPI,
  ChatEventType,
  ChatStatus,
  COZE_CN_BASE_URL,
  RoleType,
} from "@coze/api";
import { formatResponse, sleep } from "@api/utils";

import STOCKlIST from "@python/datas/stock-list.json";
import axios from "axios";

const COZE_API_KEY =
  "pat_mFJFEbTlIwv0lSiImVRHfhZhOpsScA0656VUFwTh7UXz0d24xpZT16qguzOYxFHv";
const COZE_BOT_ID = "7468929098497638438";
// 一次性分析股票的数量
const ONCE_ANALYSIS_NUM = 5;
const FILE_PATH = path.join(__dirname, './datas/stock_hot_topic.json');
const FAIL_STOCKS_FILE_PATH = path.join(__dirname, './datas/fail_stock_hot_topic.json');
interface IParams {}

const CozeClient = new CozeAPI({
  baseURL: COZE_CN_BASE_URL,
  token: COZE_API_KEY,
});

async function requestCoze(message: string) {
  const stream = await CozeClient.chat.stream({
    bot_id: COZE_BOT_ID,
    additional_messages: [
      {
        role: RoleType.User,
        content: message,
        content_type: "text",
      },
    ],
  });

  let replyStr = "";
  for await (const part of stream) {
    if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
      replyStr += part.data.content;
      // process.stdout.write(part.data.content); // Real-time response
    }
  }
  return replyStr;

  // return axios.post(
  //   "https://api.coze.cn/v3/chat",
  //   {
  //     bot_id: COZE_BOT_ID,
  //     user_id: "stock helper",
  //     stream: false,
  //     auto_save_history: true,
  //     additional_messages: [
  //       {
  //         role: "user",
  //         content: message,
  //         content_type: "text",
  //       },
  //     ],
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${COZE_API_KEY}`,
  //     },
  //   }
  // );
}

const getMessage = (stocks: Array<string>) => {
  const stocksStr = stocks.join("、");
  const template = `上市公司：${stocksStr}。请详细描述各个上市公司核心业务和涉及的概念、热点、题材。以JSON数据格式给出答案，数据格式参考如下: [{name: \"达实智能\", hot_topic: [], core_business: \"\"}], name字段为公司名称, hot_topic数组字段为涉及的概念热点题材，core_business字段为核心业务详细描述。`;
  return template;
};
export const get = async ({}: IParams) => {
  const stockList = STOCKlIST; // .slice(0, 5);

  const failStocks = [];
  for (let i = 0; i < stockList.length; ) {
    const tempStockList = stockList
      .slice(i, ONCE_ANALYSIS_NUM)
      ?.map((item) => item.name?.replace("  ", "")?.replace(" ", ""));
    const message = getMessage(tempStockList);
    // console.log("update_hot_topic_coze_shell", tempStockList, message);
    const replyMsg = await requestCoze(message);
    console.log("update_hot_topic_coze_shell done");
    try {
      const replyJson = JSON.parse(replyMsg);

      const originFileContent = fs.readFileSync(FILE_PATH, "utf8");
      // console.log('originFileContent', originFileContent);
      const originFileJson = JSON.parse(originFileContent || "[]");

      originFileJson.push(...replyJson);

      fs.writeFileSync(FILE_PATH, JSON.stringify(originFileJson));
    } catch (error) {
      failStocks.push(...tempStockList);
      console.log("update_hot_topic_coze_shell failStocks", failStocks);
    }
    await sleep(2000);
    // console.log("xxxxmessage", replyMsg);

    i += ONCE_ANALYSIS_NUM;
  }
  fs.writeFileSync(FAIL_STOCKS_FILE_PATH, JSON.stringify(failStocks));
  return formatResponse([]);
};
