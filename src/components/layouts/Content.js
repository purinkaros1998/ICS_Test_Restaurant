import React, { useEffect, useState } from 'react'
import { Row, Col, Input, Select, Card, Spin, Pagination, Button } from 'antd'
import { SearchOutlined, CalendarOutlined, LeftOutlined } from '@ant-design/icons';
import dataMockup from '../mocks/exampleData.json'
import dayjs from 'dayjs';

const Content = () => {

    const [data, setData] = useState([])
    const [pageSize] = useState(9)
    const [currentPage, setCurrentPage] = useState(1)
    const [minIndex, setMinIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(0)
    const [loading, setloading] = useState(false)
    const [defaultSelected, setDefaultSelected] = useState("")
    const [dataDetail, setDataDetail] = useState({})
    const [step, setStep] = useState("Place List")


    const days = dayjs().format("dddd")

    useEffect(() => {
        setData(dataMockup)
        setMaxIndex(9)
    }, [])
    console.log(data);

    const onClearState = () => {
        setMinIndex(0)
        setMaxIndex(9)
        setCurrentPage(1)
        setloading(false)
        setDefaultSelected("")
        setDataDetail({})
        setStep("Place List")
    }


    const handleChange = (selected) => {
        onClearState()
        setDefaultSelected(selected)
        setloading(true)
        if (dataMockup) {
            let filtering = dataMockup.filter(filted => filted.categories.includes(selected) === true)
            if (filtering) {
                setTimeout(() => {
                    setloading(false)
                    setData(filtering)
                }, 500);
            }
        }
    }

    const onHandleSearch = (value) => {
        onClearState()
        setloading(true)
        if (value) {
            let searcher = dataMockup.filter(filted => filted.name === value)
            if (searcher) {
                setTimeout(() => {
                    setloading(false)
                    setData(searcher)
                }, 500);
            }
        }
    }

    const handleChangePagenation = (page) => {
        setCurrentPage(page)
        setMinIndex((page - 1) * pageSize)
        setMaxIndex(page * pageSize)
    }

    const onHandlePlaceDetail = (items) => {
        setStep('Place List Detail')
        setDataDetail(items)
        console.log(items);
    }

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    position: "fixed",
                    justifyContent: "center",
                    left: 0,
                    top: 0,
                    width: "100vw",
                    alignItems: "center",
                    height: "100vh",
                    zIndex: 9999,
                    backgroundColor: '#FFFFFFAA'
                }}
            >
                <Spin tip="loading..." size={"default"} />
            </div>
        )
    }


    return <>
        {step === "Place List" ?
            <div className='container-content-Style'>
                <Row className="title-content" justify='space-between' align='middle'>
                    <Col style={{ fontSize: 24, fontWeight: 500 }} >Place List</Col>
                    <Col style={{
                        marginLeft: "auto",
                        paddingRight: 14
                    }}>
                        <div className='my-select-container'>
                            <Select
                                defaultValue={!defaultSelected ? "all" : defaultSelected}
                                onChange={handleChange}
                            >
                                <Select.Option value="restaurant">Restaurant</Select.Option>
                                <Select.Option value="bakery">bakery</Select.Option>
                                <Select.Option value="cafe">Cafe</Select.Option>
                            </Select>
                        </div>
                    </Col>
                    <Col style={{
                        width: 400,
                        height: 40,
                        display: "flex",
                        paddingLeft: 14,
                        borderLeft: "1.5px solid #134B8A"
                    }}><Input
                            size='large'
                            placeholder="Search name..."
                            suffix={<SearchOutlined />}
                            onPressEnter={(event) => event.key === "Enter" && onHandleSearch(event.target.value)}
                            style={{
                                border: "1px solid #143bba", borderRadius: 50, fontSize: 14, fontWeight: 400
                            }}
                        />
                    </Col>
                </Row>

                <Row className="content-cotent" gutter={[24, 24]}>
                    {data?.map((value, i) =>
                        i >= minIndex && i < maxIndex && (
                            <Col xs={24} sm={20} md={16} lg={12} xl={8} xxl={8} key={i}>
                                <Card
                                    hoverable
                                    bordered={false}
                                    style={{
                                        width: 400,
                                        height: 225,
                                        borderRadius: 10,
                                    }}
                                    bodyStyle={{ padding: '17px 21px' }}
                                    onClick={() => onHandlePlaceDetail(value)}
                                >
                                    <Row justify='space-between' style={{ marginBottom: 10 }}>
                                        <Col span={4}><img alt={value.name} src={value.profile_image_url} style={{ width: 60, height: 60, borderRadius: 10 }} /></Col>
                                        <Col span={18}>
                                            <Row gutter={[24, 8]}>
                                                <Col span={24} style={{ fontWeight: 'bold', fontSize: 18 }}>{value.name}</Col>
                                                {value.operation_time.map((date, i) => (date.day === days && <Col span={18} key={i} ><CalendarOutlined />{` ${date.time_open} - ${date.time_close} `}</Col>))}
                                                <Col span={6}><span className="dot-blue"></span>{value.rating}</Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row>
                                        {value.images.map((img, i) => (<Col span={8} key={i} ><img alt={value.name} src={img} style={{ width: 120, height: 120, borderRadius: i === 0 ? "10px 0px 0px 10px" : (i === 2 ? "0px 10px 10px 0px" : "") }} /></Col>))}
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                </Row>
                <Row justify='center'>
                    <Col style={{ marginTop: 10 }}>
                        <Pagination
                            pageSize={9}
                            current={currentPage}
                            total={data.length}
                            onChange={handleChangePagenation}
                            style={{ borderRadius: 10 }}
                        />
                    </Col>
                </Row>
            </div>
            : <div className="container-content-Style">
                <Row>
                    <Col><Button size="large" onClick={onClearState} style={{ backgroundColor: "#134B8A", borderRadius: 30, color: "#ffff", width: 98, height: 39 }}><LeftOutlined />back</Button></Col>
                </Row>
                <Row gutter={[32, 32]} style={{ width: "auto", height: "auto", backgroundColor: "#C4D3E9", margin: 20, borderRadius: 10 }}>
                    <Col span={12} style={{ margin: "16px 0" }}>
                        <Row>
                            <Col>
                                <Card
                                    hoverable
                                    style={{ borderRadius: 10, width: "auto" }}
                                    cover={<img alt={dataDetail.name} src={dataDetail.profile_image_url} style={{ borderRadius: "10px 10px 0  0", width: "100%" }} />}
                                >
                                    <Row justify='space-between' align='middle'>
                                        <Col flex="auto"><h3><b>{dataDetail.name}</b></h3></Col>
                                        <Col flex="none"><span className="dot-blue-detail"></span>{dataDetail.rating}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}><b>Address :</b></Col>
                                        <Col span={12}>{dataDetail.address}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}><b>Opening Hour :</b></Col>
                                        <Col span={12}>
                                            {dataDetail.operation_time.map((items, i) => (
                                                items.time_open !== "closed" ?
                                                    <Row key={i}><Col>{`${items.day}: ${items.time_open} - ${items.time_close}`}</Col></Row>
                                                    :
                                                    <Row key={i}><Col>{`${items.day}: ${items.time_open}`}</Col></Row>
                                            ))}</Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>

                    </Col>
                    <Col span={12} style={{ margin: "16px 0" }}>
                        <Card
                            hoverable
                            style={{ borderRadius: 10, width: "auto" }}
                        >
                            <Row className="title-imamgs" ><Col><b>Images</b></Col></Row>
                            <Row className="images" style={{ margin: '10px 0' }}>
                                {dataDetail.images.map((img, i) => (
                                    <Col key={i}>
                                        <Row><Col><img src={img} alt={img[i]} style={{ width: "100%", borderRadius: i === 0 ? "10px 10px 0px 0px" : (i === 2 ? "0px 0px 10px 10px" : "") }} /></Col></Row>
                                    </Col>
                                ))}

                            </Row>
                        </Card>
                    </Col>

                </Row>
            </div >
        }
    </>
}

export default Content