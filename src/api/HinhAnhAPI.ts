import React from "react";
import HinhAnhModel from "../models/HinhAnhModel";
import { my_request } from "./Request";

async function layAnhCuaMotSach(duongDan:string): Promise<HinhAnhModel[]> {
    const ketQua: HinhAnhModel[] = [];

    const response = await my_request(duongDan);

    const responseData = response._embedded.hinhAnhs;

    for (const key in responseData) {
        ketQua.push({
            maHinhAnh: responseData[key].maHinhAnh,
            tenHinhAnh: responseData[key].tenHinhAnh,
            laIcon: responseData[key].laIcon,
            duongDan: responseData[key].duongDan,
            duLieuAnh:responseData[key].duLieuAnh  
        });
    }


    return ketQua;
}

export async function layToanBoAnhCuaMotSach(maSach: number): Promise<HinhAnhModel[]> {

    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;
    return layAnhCuaMotSach(duongDan);
    
}
export async function lay1AnhCuaMotSach(maSach: number): Promise<HinhAnhModel[]> {

    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh?sort=maHinhAnh,asc&page=0&size=1`;
    return layAnhCuaMotSach(duongDan);
    
}