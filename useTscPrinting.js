import React, {useState, useEffect} from 'react';
import TscPrint from 'react-native-tsc-printing';

var tsc = new TscPrint();

const VNPT_ID = 3;
const NINJAVAN_ID = 5;
const AHAMOVE_ID = 10;
const DHL_ID = 16;
const GHN_ID = 17;
const SNAPPY_ID = 18;
const FAULT_ID = 100

const requireSortCode = [VNPT_ID , GHN_ID]
const useTscPrinting = (config) => {
  const fixNull = value => {
    if (checkNull(value)) return '';
    return value;
  };

  useEffect(() =>{
    console.log({...config , width: 80, height: 100})
    tsc.setConfig({...config , width: 80, height: 100});
  },[config])

  const [printData, setPrintData] = useState({});

  var shippingName;
  var shippingPhone;
  var shippingAddress;
  var district;
  var ward;
  var province;
  var partnerName;
  var deliveryPartner;
  var eventDeliveryDate;
  var partnerCode;
  var deliveryId;
  var date;
  var orderFull;
  var deliveryId;
  var suborderId;
  var deliveryPartnerId;
  var orderId;
  var total;
  var sortCode;
  var note;

  const checkNull = value => {
    return value === null || value === undefined || value.length === 0;
  };



  const generateLayoutLabel = () => {
    tsc.printBox(15, 5, 632, 790);
    //Ke duong ngang
    tsc.printDiagonal(15, 125, 632, 248);
    tsc.printDiagonal(15, 413, 632, 413);
    tsc.printDiagonal(15, 510, 632, 510);
    tsc.printDiagonal(15, 616, 379, 616);
    switch (parseInt(deliveryPartnerId)) {
      case VNPT_ID:
        break;
      case GHN_ID:
        tsc.printDiagonal(15, 203, 632, 203);
      default:
        tsc.printDiagonal(382, 326, 632, 326);
    }

    //Ke duong doc
    tsc.printDiagonal(382, 248, 382, 413);
    tsc.printDiagonal(382, 510, 382, 790);
    switch (parseInt(deliveryPartnerId)) {
      case VNPT_ID:
        break;
      default:
        tsc.printDiagonal(382, 413, 382, 500);
    }
  };

  const printLabelOrder = data => {
    console.log(data)
    shippingName = data.shippingName;
    shippingPhone = data.shippingPhone;
    shippingAddress = data.shippingAddress;
    district = data.district;
    ward = data.ward;
    province = data.province;
    partnerName = data.partnerName;
    deliveryPartner = data.deliveryPartner;
    eventDeliveryDate = data.eventDeliveryDate;
    partnerCode = data.partnerCode;
    deliveryId = data.deliveryId;
    date = data.date;
    deliveryId = data.deliveryId
      ? data.deliveryId
      : `${data.prefix}${data.suborderId}`;
    suborderId = data.suborderId;
    deliveryPartnerId = data.deliveryPartnerId;
    orderId = data.orderId;
    total = data.total;
    note = data.note;
    sortCode = fixNull(data.sortCode);
    orderFull = data.orderFull
    if(requireSortCode.includes(deliveryPartnerId) && sortCode.length ===0){
      deliveryPartnerId = FAULT_ID
    }

    return new Promise(async (resolve, reject) => {
      try {
        if(!config.ip) throw ("noIp")
        generateLayoutLabel();
        printCodesLabel();
        printLogosLabel();
        printTextLabel();
        tsc.print();
        tsc
          .executePrint()
          .then(() => resolve())
          .catch(e => reject(e));
      } catch (e) {
        reject(e);
      }
    });
  };

  const printLogosLabel = () => {
    const logoName = 'fhsmall.bmp';
    switch (parseInt(deliveryPartnerId)) {
      case VNPT_ID:
      // tsc.printBMP(37, 135, logoName);
      // break;
      case GHN_ID:
        tsc.printBMP(44, 30, logoName);
        break;
      default:
        tsc.printBMP(320, 30, logoName);
    }
  };

  const printTextLabel = () => {
    printItemContent();
    printDeliverPartnerAndMPartnerCode();
    printSuborderAndDateInfo();
    printCustomerInfo();
    printCOD();
    printNoteAndOthers();
  };

  const printNoteAndOthers = () => {
    tsc.printText(35, 525, 9, 9, 'Ghi chú: ', true);
    tsc.printBlock(35, 555, 350, 50, note, 8, 8);
    tsc.printText(400, 525, 9, 9, 'ĐƯỢC XEM HÀNG', true);
  };

  const printCOD = () => {
    switch (parseInt(deliveryPartnerId)) {
      case VNPT_ID:
        tsc.printText(440, 275, 9, 9, `Tiền thu hộ:`, true);
        tsc.printBlock(425, 315, 170, 20, total, 12, 12);
        break;
      default:
        tsc.printText(35, 425, 9, 9, `Tiền thu hộ:`, true);
        tsc.printBlock(120, 455, 170, 20, total, 12, 12);
    }
  };

  const printCustomerInfo = () => {
    tsc.printText(35, 260, 8, 8, shippingName);
    tsc.printText(250, 260, 8, 8, shippingPhone);
    tsc.printText(35, 290, 8, 8, 'Địa chỉ: ', true);
    tsc.printBlock(35, 320, 330, 90, shippingAddress, 8, 8);

    switch (parseInt(deliveryPartnerId)) {
      case VNPT_ID:
        break;
      default:
        tsc.printText(405, 260, 8, 8, 'Huyện/ Xã :', true);
        tsc.printBlock(405, 290, 200, 30, ward, 8, 8);

        tsc.printText(405, 340, 8, 8, 'Quận/ Huyện: ', true);
        tsc.printBlock(405, 370, 200, 30, district, 8, 8);

        tsc.printText(405, 425, 8, 8, 'Tỉnh/ TP: ', true);
        tsc.printBlock(405, 455, 200, 30, province, 8, 8);
    }
  };

  const printDeliverPartnerAndMPartnerCode = () => {
    const partnerInfoTitle =
      partnerName == 'Fahasa' ? '' : `Mã đơn ${partnerName}:`;
    const partnerInfoContent = partnerName == 'Fahasa' ? '' : `${partnerCode}`;

    switch (parseInt(deliveryPartnerId)) {
      case GHN_ID:
        tsc.printText(230, 210, 15, 15, sortCode, true);
      case VNPT_ID:
        tsc.printText(40, 125, 11, 11, deliveryPartner, true);
        tsc.printText(385, 20, 8, 8, partnerInfoTitle, true);
        tsc.printText(385, 50, 8, 8, partnerInfoContent);
        break;
      default:
        tsc.printText(320, 140, 15, 15, deliveryPartner, true);
    }
  };

  const printSuborderAndDateInfo = () => {
    switch (parseInt(deliveryPartnerId)) {
      case VNPT_ID:
      // tsc.printText(35, 185, 8, 8, date);
      // tsc.printText(35, 220, 8, 8, orderId, true);
      // break;
      case GHN_ID:
        tsc.printText(385, 80, 8, 8, date);
        tsc.printText(55, 78, 8, 8, orderFull, true);
        break;
      default:
        tsc.printText(320, 80, 8, 8, date);
        tsc.printText(320, 110, 8, 8, orderFull, true);
    }
  };

  const printItemContent = () => {
    var itemContentTitle, itemContentDetail;
    switch (partnerName) {
      case 'Fahasa':
        itemContentTitle = 'Nội dung hàng hoá:';
        itemContentDetail = '- Sách, văn hoá phẩm và văn phòng phẩm';
      case 'Tiki':
      case 'Lazada':
      case 'Shopee':
      case 'Sendo':
      case 'VNShop':
      default:
        itemContentTitle = 'Ghi chú giao hàng:';
        if (checkNull(eventDeliveryDate)) {
          itemContentDetail = `- Note: Nhà bán hàng FAHASA trên ${partnerName}`;
        } else itemContentDetail = `- Hẹn ngày giao hàng: ${eventDeliveryDate}`;
    }
    tsc.printText(27, 640, 8, 8, itemContentTitle, true);
    tsc.printBlock(27, 670, 359, 100, itemContentDetail, 9, 9);
  };

  const printCodesLabel = () => {
    var sizeQR = deliveryId.length > 12 ? 8 : 9
    switch (parseInt(deliveryPartnerId)) {
      case VNPT_ID:
        tsc.printBarcode(220, 110, 120, sortCode, 0, 5, 5);
        tsc.printText(70, 190, 9, 9, sortCode, true);
        tsc.printBarcode(65, 420, 80, deliveryId, 0, 2, 2);
        tsc.printText(420, 450, 8, 8, deliveryId, true);
        break;
      case GHN_ID:
        tsc.printBarcode(260, 110, 75, deliveryId, 0, 2, 2, 2);
        tsc.printText(70, 175, 9, 9, deliveryId, true);
        break;
      default:
        tsc.printQRCode(30, 30, sizeQR, deliveryId);
    }
    tsc.printQRCode(400, 565, 8, orderFull);
  };
  return {printLabelOrder};
};

module.exports = {useTscPrinting};
