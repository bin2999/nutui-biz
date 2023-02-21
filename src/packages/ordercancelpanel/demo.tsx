import React, { useState, CSSProperties } from "react";
import { OrderCancelPanel } from "./ordercancelpanel";
import { Cell, Button, ButtonProps, TextAreaProps } from "@nutui/nutui-react";
import { useTranslate } from "../../sites/assets/locale";

interface IKeyValue {
  key: string;
  value: string;
}
interface T {
  basic: string;
  tipsText: string;
  otherText: string;
  cellTitle: string;
  btnsText: string;
  cancelReasonTitle: string;
  reasonTitle: string;
  tipsTitle: string;
  textareaPlaceholder: string;
  warmTips: Array<string>;
  cancelReason: Array<IKeyValue>;
  otherReason: Array<IKeyValue>;
}

const CouponDemo = () => {
  const [translated] = useTranslate<T>({
    "zh-CN": {
      basic: "基本用法",
      tipsText: "带有温馨提示的组件",
      otherText: "带有其他原因选项的组件",
      cellTitle: "显示弹窗",
      btnsText: "确认",
      cancelReasonTitle: "退款原因",
      reasonTitle: "请选择取消订单原因",
      tipsTitle: "温馨提示",
      textareaPlaceholder: "请输入内容",
      warmTips: [
        "1. 限时特价、预约资格等购买优惠可能一并取消",
        "2. 如遇订单拆分，京券将换成同价值京豆返还",
        "3. 支付券不予返还；支付优惠一并取消",
        "4. 订单一旦取消，无法恢复",
      ],
      cancelReason: [
        {
          key: "resons1",
          value: "商品无货",
        },
        {
          key: "resons2",
          value: "发货时间问题",
        },
        {
          key: "resons3",
          value: "不想要了",
        },
        {
          key: "resons4",
          value: "商品选错/多选",
        },
        {
          key: "resons5",
          value: "地址信息填写错误",
        },
        {
          key: "resons6",
          value: "商品降价",
        },
      ],
      otherReason: [
        {
          key: "other",
          value: "其他",
        },
      ],
    },
    "en-US": {
      basic: "Basic Usage",
      tipsText: "Components with warm tips",
      otherText: "Components with other reason options",
      cellTitle: "Show Dialog",
      tipsTitle: "reminder",
      reasonTitle: "Please select the reason for canceling the order",
      cancelReasonTitle: "Refund reason",
      btnsText: "confirm",
      textareaPlaceholder: "Please enter content",
      warmTips: [
        "1. Limited time special offers, reservation qualifications and other purchase privileges may be cancelled at the same time",
        "2. In case of order splitting, coupons will be exchanged for beans of the same value and returned",
        "3. The payment voucher will not be returned; Cancellation of payment preference",
        "4. Once the order is cancelled, it cannot be recovered",
      ],
      cancelReason: [
        {
          key: "resons1",
          value: "No goods",
        },
        {
          key: "resons2",
          value: "Delivery time problem",
        },
        {
          key: "resons3",
          value: "do not want goods",
        },
        {
          key: "resons4",
          value: "Wrong goods selected",
        },
        {
          key: "resons5",
          value: "Incorrect address information",
        },
        {
          key: "resons6",
          value: "Commodity price reduction",
        },
      ],
      otherReason: [
        {
          key: "other",
          value: "other",
        },
      ],
    },
  });

  //合并other其他原因
  const otherReasonList = React.useMemo(() => {
    return [...translated.cancelReason, ...translated.otherReason];
  }, []);
  //公共参数
  const buttonProps: Partial<ButtonProps> = React.useMemo(() => {
    return {
      type: "primary",
      className: "cancel-btn",
    };
  }, []);
  const textareaProps: Partial<TextAreaProps> = React.useMemo(() => {
    return {
      placeholder: translated.textareaPlaceholder,
      rows: "3",
      limitshow: true,
      maxlength: 100,
    };
  }, []);
  const popupTitleMemo = React.useMemo(() => {
    return <div>{translated.cancelReasonTitle}</div>;
  }, []);
  const reasonTitleMemo = React.useMemo(() => {
    return <div>{translated.reasonTitle}</div>;
  }, []);

  //基本使用
  const [showPanel, setShowPanel] = useState(false);
  //带有温馨提示的组件
  const [showCancelPanel, setShowCancelPanel] = useState(false);
  //带有其他原因选项的组件
  const [showOtherCancelPanel, setShowOtherCancelPanel] = useState(false);

  //关闭弹窗触发的事件
  const clickClosePopUp = React.useCallback(() => {
    setShowPanel(false);
  }, [showPanel]);

  const clickClosePopUpSec = React.useCallback(() => {
    setShowCancelPanel(false);
  }, [showCancelPanel]);

  const clickClosePopUpThree = React.useCallback(() => {
    setShowOtherCancelPanel(false);
  }, [showOtherCancelPanel]);

  //提交事件
  const submitBtn = React.useCallback(
    (currActivedKey: string, textAreaValue: string) => {
      console.log(
        `currActivedKey:${currActivedKey}, textAreaValue,${textAreaValue}`
      );
      clickClosePopUp();
      clickClosePopUpSec();
      clickClosePopUpThree();
    },
    []
  );

  return (
    <>
      <div className="demo">
        <h2>{translated.basic}</h2>
        <Cell title={translated.cellTitle} onClick={() => setShowPanel(true)} />
        <OrderCancelPanel
          showCancelPanel={showPanel}
          popupTitle={popupTitleMemo}
          cancelResons={translated.cancelReason}
          buttonProps={buttonProps}
          onClickCloseIcon={clickClosePopUp}
          onClose={clickClosePopUp}
          onClickOverlay={clickClosePopUp}
          onSubmitBtn={submitBtn}
        />
        <h2>{translated.tipsText}</h2>
        <Cell
          title={translated.cellTitle}
          onClick={() => setShowCancelPanel(true)}
        />
        <OrderCancelPanel
          showCancelPanel={showCancelPanel}
          popupTitle={popupTitleMemo}
          reasonTitle={reasonTitleMemo}
          cancelResons={translated.cancelReason}
          warmTips={translated.warmTips}
          tipsTitle={translated.tipsTitle}
          btnsText={translated.btnsText}
          buttonProps={buttonProps}
          onClickCloseIcon={clickClosePopUpSec}
          onClose={clickClosePopUpSec}
          onClickOverlay={clickClosePopUpSec}
          onSubmitBtn={submitBtn}
        />
        <h2>{translated.otherText}</h2>
        <Cell
          title={translated.cellTitle}
          onClick={() => setShowOtherCancelPanel(true)}
        />
        <OrderCancelPanel
          showCancelPanel={showOtherCancelPanel}
          popupTitle={popupTitleMemo}
          canCancelReason={true}
          tipsTitle={translated.tipsTitle}
          btnsText={translated.btnsText}
          warmTips={translated.warmTips}
          cancelResons={otherReasonList}
          buttonProps={buttonProps}
          textAreaProps={textareaProps}
          onClickCloseIcon={clickClosePopUpThree}
          onClose={clickClosePopUpThree}
          onClickOverlay={clickClosePopUpThree}
          onSubmitBtn={submitBtn}
        />
      </div>
    </>
  );
};

export default CouponDemo;
