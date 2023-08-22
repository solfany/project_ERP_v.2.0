import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, message, Radio } from 'antd';
import { CModalHeader, CModal, CModalBody, CButton } from '@coreui/react';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function PointShopForm() {
  const [item, setItem] = useState({
    itemNm: '',
    price: 0,
    stockNumber: 0,
    itemDetail: '',
    itemSellStatus: '',
    images: [],
  });
  const [sellStatus, setSellStatus] = useState('');
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onFinish = async (values) => {
    const formData = new FormData();

    // 이미지 업로드 부분 수정
    for (let i = 0; i < item.images.length; i++) {
      formData.append('itemImgFileList', item.images[i]);
    }

    // 상품 정보를 JSON 형식으로 변환하여 formData에 추가
    const itemInfo = {
      itemNm: values.itemNm,
      price: values.price,
      stockNumber: values.stockNumber,
      itemDetail: values.itemDetail,
      itemSellStatus: values.itemSellStatus,
    };
    formData.append('itemInfo', JSON.stringify(itemInfo));

    try {
      const response = await axios.post('/api/item/new', formData);
      if (response.status === 200) {
        message.success('상품이 성공적으로 등록되었습니다.');
        form.resetFields();
        setVisible(false); // 모달 닫기
      }
    } catch (error) {
      console.error(error);
      message.error('상품 등록 중 에러가 발생했습니다.');
    }
  };

  const handleChange = (value) => {
    setSellStatus(value);
  };

  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>상품 등록하기</CButton>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>상품 등록</CModalHeader>
        <CModalBody>
          <Form
            form={form}
            onFinish={onFinish}
            className="row needs-validation"
          >
            {/* 상품명 */}
            <Form.Item
              label="상품명"
              name="itemNm"
              rules={[
                {
                  required: true,
                  message: '상품명은 필수 입력 값입니다.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* 가격 */}
            <Form.Item
              label="가격"
              name="price"
              rules={[
                {
                  required: true,
                  message: '가격은 필수 입력 값입니다.',
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            {/* 재고수량 */}
            <Form.Item
              label="재고수량"
              name="stockNumber"
              rules={[
                {
                  required: true,
                  message: '재고수량은 필수 입력 값입니다.',
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            {/* 상품 상세설명 */}
            <Form.Item
              label="상품 상세설명"
              name="itemDetail"
              rules={[
                {
                  required: true,
                  message: '상품 상세설명은 필수 입력 값입니다.',
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            {/* 상품 판매상태 */}
            <Form.Item
              label="상품 판매상태"
              name="itemSellStatus"
              initialValue="SELL"
              rules={[
                {
                  required: true,
                  message: '상품 판매상태는 필수 입력 값입니다.',
                },
              ]}
            >
              <Radio.Group onChange={handleChange}>
                <Radio.Button value="SELL">판매중</Radio.Button>
                <Radio.Button value="SOLD_OUT">품절</Radio.Button>
              </Radio.Group>
            </Form.Item>

            {/* 이미지 업로드 */}
            <Form.Item label="이미지 업로드">
              <Upload
                multiple
                listType="picture-card"
                onChange={(info) => {
                  const fileList = info.fileList;
                  const newImages = fileList.map((file) => file.originFileObj);
                  setItem((prev) => ({
                    ...prev,
                    images: newImages,
                  }));
                }}
              >
                <Button icon={<UploadOutlined />}>이미지 선택</Button>
              </Upload>
            </Form.Item>

            {/* 저장 버튼 */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                저장
              </Button>
            </Form.Item>
          </Form>
        </CModalBody>
      </CModal>
    </>
  );
}

export default PointShopForm;
