import React, {useState, useEffect} from 'react';
import FitPrint from 'react-native-fit-printing';
import moment from 'moment'

const VNPT_ID = 3;
const NINJAVAN_ID = 5;
const AHAMOVE_ID = 10;
const DHL_ID = 16;
const GHN_ID = 17;
const SNAPPY_ID = 18;
const defaultFontSize = 21
const useFitPrinting = ({ip}) => {
  const fixNull = (value) => {
    if (checkNull(value)) return '';
    return value;
  };

  const checkNull = (value) => {
    return value === null || value === undefined || value.length === 0;
  };

  const printBillOrder = (printData)=>{
    const {
      suborderId,
      listItem,
      orderId,
      shippingFee,
      wrappingFee,
      discountAmount,
      fpoint,
      fhsCoin,
      createdAt,
      paymentMethod,
      shippingMethod,
      billingAddress,
      billingName,
      billingPhone,
      shippingAddress,
      shippingName,
      shippingPhone,
      eInvoiceRef,
      eInvoiceUrl,
      total,
    } = printData;
    const orderFull = `${suborderId}_${orderId}`
    const paymentMethodVi = langvi[paymentMethod] || 'Đã thanh toán thành công bằng thẻ quốc tế Visa/Master/JCB';
    const shippingMethodVi =
      shippingMethod !== 'express' ? 'Vận chuyển thường' : 'Vận chuyển nhanh';
    return new Promise((resolve, reject) =>{
      try {
        const fit = new FitPrint();
        fit.setDefaultFontSize(defaultFontSize)
        fit.setDefaultWidth(580)
        fit.connect(ip).then(()=>{
          fit.printLogo(suborderId)

          fit.createNewLine();
          fit.printText('Mã đơn hàng:', 0.5 , defaultFontSize , 0 , 0 ,true);
          fit.printText(orderFull, 0.5 , defaultFontSize ,0 , 0 ,true);
          fit.printLine();

          fit.createNewLine();
          fit.printText("Phương thức thanh toán:", 0.5 );
          fit.printText(paymentMethodVi, 0.5 );
          fit.printLine();
 
          fit.createNewLine();
          fit.printText("Phương thức vận chuyển:", 0.5 );
          fit.printText(shippingMethodVi, 0.5 );
          fit.printLine();
       
          fit.createNewLine();
          fit.printText("Ngày đặt hàng:", 0.5 );
          fit.printText(moment(createdAt).format("DD-MM-YYYY HH:mm:ss"), 0.5 );
          fit.printLine();

          fit.createNewLine();
          fit.printText("Ngày in phiếu giao hàng:", 0.5 );
          fit.printText(moment().format("DD-MM-YYYY HH:mm:ss"), 0.5 );
          fit.printLine();


          fit.createNewLine();
          fit.printText("Thông tin thanh toán:", 1, defaultFontSize, 0,0 , true);
          fit.printLine();

          fit.createNewLine();
          fit.printText(billingName,1);
          fit.printLine();

          fit.createNewLine();
          fit.printText(billingAddress,1);
          fit.printLine();

          fit.createNewLine();
          fit.printText(billingPhone,1);
          fit.printLine();

          fit.createNewLine();
          fit.printText("Thông tin nhận hàng:", 1, defaultFontSize, 0,0 , true);
          fit.printLine();

          fit.createNewLine();
          fit.printText(shippingName,1);
          fit.printLine();

          fit.createNewLine();
          fit.printText(shippingAddress,1);
          fit.printLine();

          fit.createNewLine();
          fit.printText(shippingPhone,1);
          fit.printLine();


          fit.createNewLine();   
          fit.printText("Chi tiết đơn hàng", 1, 35, 0,0 , true,1);
          fit.printLine();
          
          fit.printSpace(10)

          fit.printDiagonal(5);

          fit.createNewLine();   
          fit.printText("STT",0.1);
          fit.printText("Tên",0.3);
          fit.printText("SL",0.1);
          fit.printText("Giá",0.2);
          fit.printText("CK",0.1);
          fit.printText("Thành tiền" , 0.2)
          fit.printLine();

          fit.printDiagonal(3);

          for (var i = 0; i < listItem.length; i++) {
            const {name, price, originalPrice, qty} = listItem[i];
            fit.createNewLine();
            fit.printText(`${i + 1}`, 0.1);
            fit.printText(name, 0.9);
            fit.printLine();

            fit.createNewLine();
            fit.printText(" ", 0.4);
            fit.printText(qty.toString(), 0.1);
            fit.printText(formatString(originalPrice), 0.2);
            fit.printText(`${Math.floor((price / originalPrice) * 100)}%`, 0.1);
            fit.printText(formatString(price), 0.2);
            fit.printLine();
          }

          fit.printDiagonal(3);
          const listFee = {
            'Phí vận chuyển:': shippingFee,
            'Phí gói quà:': wrappingFee,
            'Giảm giá thêm:': -discountAmount,
            'Fpoint:': -fpoint,
            'Code điện tử:': -fhsCoin,
          };

          fit.createNewLine();
          fit.printText("Tổng cộng:", 0.8 , defaultFontSize ,200 , 0 );
          fit.printText(`${formatString(listItem.reduce((total, item)=> total + item.price,0))}` , 0.2)
          fit.printLine();

          for(const fee of Object.keys(listFee)){
            const feeDetail = listFee[fee];
            if(feeDetail){
              fit.createNewLine();
              fit.printText(fee, 0.8 , defaultFontSize ,200 , 0 );
              fit.printText(`${formatString(feeDetail)}` , 0.2)
              fit.printLine();
            }
          }

      
          fit.createNewLine();
          fit.printText("Tổng thanh toán:",  0.8 , defaultFontSize ,200 , 0 ,true)
          fit.printText(`${formatString(total)}` , 0.2)
          fit.printLine();

          fit.printSpace(10);
          fit.printDiagonal(3);
          fit.printDiagonal(3);
          fit.printSpace(10);

          if(eInvoiceRef){
            fit.createNewLine();
            fit.printText("Quý khách tra cứu hóa đơn điện tử bằng mã:",  0.75 )
            fit.printText(`${eInvoiceRef}` , 0.25, defaultFontSize, 0 , 0 , true);
            fit.printLine();
  
            fit.createNewLine();
            fit.printText(`tại đường dẫn ${eInvoiceUrl}`, 1 )
            fit.printLine();
  
  
            fit.createNewLine();
            fit.printText(`hoặc quét mã QR sau : `, 1 )
            fit.printLine();
  
            fit.createNewLine();
            fit.printBarcode(`${eInvoiceUrl}?sec=${eInvoiceRef}`,200,0,1,1)
            fit.printLine();
          }
        
          fit.cutPaper();
          fit.disconnect();
          resolve();
        });
      } catch (e) {
        reject(e)
      }
    })
  }

  return {printBillOrder};
};

module.exports = {useFitPrinting};

const langvi = {
  payment_cashondelivery: 'Thanh toán bằng tiền mặt khi nhận hàng',
  payment_webmoney: 'Đã thanh toán thành công bằng WebMoney',
  payment_zalopay: 'Đã thanh toán thành công bằng Zalopay',
  payment_banktransfer: 'Đã thanh toán thành công bằng chuyển khoản ngân hàng',
  payment_pg123pay:
    'Đã thanh toán thành công bằng thẻ ATM nội địa / Internet Banking',
};



const formatString = function(price) {
  var result = ''
  let minus = false
  if (price < 0) {
    minus = true
    price = -price
  }
  price = parseInt(price, 10)
  for (; price >= 1000; price = parseInt(price / 1000, 10)) {
    result = ',' + format(price % 1000) + result
  }
  result = (price % 1000) + result
  return minus ? '-' + result : result
}

const format =  function(number) {
  number = '' + number
  switch (number.length) {
    case 1:
      number = '00' + number
      break
    case 2:
      number = '0' + number
      break
    default:
  }
  return number 
}