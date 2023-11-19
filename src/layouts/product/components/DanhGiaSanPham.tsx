import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import HinhAnhModel from "../../../models/HinhAnhModel";
import { layToanBoDanhGiaCuaMotSach } from "../../../api/DanhGiaAPI";
import DanhGiaModel from "../../../models/DanhGia";
import renderRating from "../../utils/SaoXepHang";

interface DanhGiaSanPham{
    maSach: number;
}

const DanhGiaSanPham: React.FC<DanhGiaSanPham> = (props) => {

    const maSach: number = props.maSach;

    const [danhSachDanhGia, setDanhSachDanhGia] = useState<DanhGiaModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        layToanBoDanhGiaCuaMotSach(maSach).then(
            danhSachDanhGia =>{
                setDanhSachDanhGia(danhSachDanhGia);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        );
    }, [] 
    )
    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }

    return (
        <div className="container mt-2 mb-2 text-center">
        <h4>Đánh giá sản phẩm: </h4>
        {
            danhSachDanhGia.map((danhGia, index) => (
                <div className="row">
                    <div className="col-4  text-end">
                        <p>{renderRating(danhGia.diemXepHang?danhGia.diemXepHang:0)}</p>
                    </div>
                    <div className="col-8 text-start">
                        <p>{danhGia.nhanXet}</p>
                    </div>
                </div>
            )
            )
        }

    </div>
    );
}
export default DanhGiaSanPham;