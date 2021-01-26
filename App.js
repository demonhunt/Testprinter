/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import FitPrinter from 'react-native-fit-printing';
import TscPrint from 'react-native-tsc-printing';
import React, {useState} from 'react';
import {useTscPrinting} from './useTscPrinting';
import {useFitPrinting} from './useFitPrinting';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';

const config = {
  size: 'small',
  heightRatio: 0.6666666666666666,
  widthRatio: 0.8,
  ip: '192.168.1.223',
};
const App: () => React$Node = () => {
  const [ip, setIp] = useState('192.168.1.221');
  const {printLabelOrder} = useTscPrinting({...config, ip});
  const {printBillOrder} = useFitPrinting({ip});

  const printLabel = () => {
    printLabelOrder(dataSample);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <TextInput
          selectTextOnFocus
          value={ip}
          onChangeText={(text) => setIp(text)}
          style={styles.textinput}
        />
        <Pressable
          style={styles.button}
          onPress={() => {
            printLabel();
          }}>
          <Text>Test Instance bill</Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  textinput: {width: 200, borderWidth: 0.6, margin: 20},
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button: {
    padding: 20,
    backgroundColor: 'orange',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
});

export default App;
const dataSample = {
  billingAddress: '2A53, Tỉnh lộ 10, Ấp 2 Huyện Bình Chánh Hồ Chí Minh VN',
  billingName: 'Phạm Hoàng Nam',
  billingPhone: '0372940560',
  bookstoreId: 67,
  boxUsage: '11',
  codFee: 0,
  createdAt: '2021-01-12T15:59:19.000Z',
  date: '25-01-2021 15:07',
  deliveryId: 'EG709018952VN',
  deliveryPartner: 'VNPost',
  deliveryPartnerId: 10,
  discountAmount: 0,
  district: 'Huyện Bình Chánh',
  eInvoiceRef: 'T10001Xbpu',
  eInvoiceUrl: 'https://hoadon.fahasa.com/search.html',
  eventDeliveryDate: null,
  fhsCoin: 0,
  fpoint: 0,
  hasLogo: false,
  iconPath: null,
  isHideInfo: false,
  isSameday: false,
  isUseLetter: true,
  listItem: [
    {
      image:
        'https://fahasa.com/media/catalog/product//i/m/image_195509_1_27168.jpg',
      name: "Sổ Lò Xo Oxford Đen B5 Sidebinding 80'S - D127B5",
      originalPrice: 61000,
      price: 61000,
      qty: 1,
      sku: '8809387694688',
      unit: 'Cuốn',
    },
    {
      image:
        'https://fahasa.com/media/catalog/product//8/8/8809387694060_2.jpg',
      name: 'Sổ Lò Xo Oxford B5 Classic D85B5 - Màu Xanh Lá',
      originalPrice: 61000,
      price: 61000,
      qty: 2,
      sku: '8809387694060-mau3',
      unit: 'Cuốn',
    },
  ],
  note: '""',
  orderFull: '22786606_101739587',
  orderId: '101739587',
  orderStatus: 'complete',
  partnerCode: '1212121212',
  partnerName: 'Tiki',
  paymentMethod: 'cashondelivery',
  prefix: 'C',
  processed: false,
  province: 'Hồ Chí Minh',
  shippingAddress: '2A53, Tỉnh lộ 10, Ấp 2 Huyện Bình Chánh Hồ Chí Minh VN',
  shippingFee: 11250,
  shippingMethod: 'normal',
  shippingName: 'Phạm Hoàng Nam',
  shippingPhone: '0372940560',
  shippingStreet: '2A53, Tỉnh lộ 10, Ấp 2',
  sortCode: '718510',
  status: 'complete',
  suborderId: '22786606',
  total: '194.250 VND',
  useBarcode: false,
  useSortCode: true,
  userPicking: [
    {created_by: 'duc.nguyen@fahasa.com'},
    {created_by: 'thien.tran@fahasa.com'},
  ],
  ward: 'Xã Phạm Văn Hai',
  wrappingFee: 0,
};
