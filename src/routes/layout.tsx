import { Outlet } from "@modern-js/runtime/router";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import zhCN from "antd/lib/locale/zh_CN";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(weekday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.locale("zh-cn");

import "dayjs/locale/zh-cn";
import "moment/locale/zh-cn";
import "./index.css";

export default function Layout() {
  return (
    <div>
      <ConfigProvider locale={zhCN}>
        <Outlet />
      </ConfigProvider>
    </div>
  );
}
