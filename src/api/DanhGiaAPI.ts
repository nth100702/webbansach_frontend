import React from "react";
import DanhGiaModel from "../models/DanhGia";
import { my_request } from "./Request";

async function layDanhGiaCuaMotSach(duongDan:string): Promise<DanhGiaModel[]> {
    const ketQua: DanhGiaModel[] = [];

    const response = await my_request(duongDan);

    const responseData = response._embedded.suDanhGias;

    for (const key in responseData) {
        ketQua.push({
            maDanhGia: responseData[key].maDanhGia,
            diemXepHang: responseData[key].diemXepHang,
            nhanXet: responseData[key].nhanXet,
        });
    }


    return ketQua;
}

export async function layToanBoDanhGiaCuaMotSach(maSach: number): Promise<DanhGiaModel[]> {

    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachDanhGia`;
    return layDanhGiaCuaMotSach(duongDan);
    
}
export async function lay1AnhCuaMotSach(maSach: number): Promise<DanhGiaModel[]> {

    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachDanhGia?sort=maDanhGia,asc&page=0&size=1`;
    return layDanhGiaCuaMotSach(duongDan);
    
}