import { useState } from "react"

function DanKyNguoiDung(){
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [email, setEmail] = useState("");
    const [ten, setTen] = useState("");
    const [hoDem, setHoDem] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [matKhauLapLai, setMatKhauLapLai] = useState("");
    const [gioiTinh, setGioiTinh] = useState('M');
    
    const [errorTenDangNhap, setErrorTenDangNhap] = useState("");
    const [errorEmail, setErrorEmail]=useState("");
    const [errorMatKhau, setErrorMatKhau]=useState("");
    const [errorMatKhauLapLai, setErrorMatKhauLapLai]=useState("");
    const [thongBao, setThongBao] = useState("");
    
    const handleSubmit = async (e: React.FormEvent) => {
        // Clear any previous error messages
        setErrorTenDangNhap('');
        setErrorEmail('');
        setErrorMatKhau('');
        setErrorMatKhauLapLai('');

        // Tránh click liên tục
        e.preventDefault();

        const isTenDangNhapValid = !await kiemTraTenDangNhapDaTonTai(tenDangNhap);
        const isEmailValid = !await kiemTraEmailTonTai(email);
        const isMatKhauValid = !kiemTraMatKhau(matKhau);
        const isMatKhauLapLaiValid = !kiemTraMatKhauLapLai(matKhauLapLai);

        if (isTenDangNhapValid && isEmailValid && isMatKhauValid && isMatKhauLapLaiValid) {
            try {
                const url = 'http://localhost:8080/tai-khoan/dang-ky';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json',
                    },
                    body: JSON.stringify({
                        tenDangNhap: tenDangNhap,
                        email: email,
                        matKhau: matKhau,
                        hoDem: hoDem,
                        ten: ten,
                        soDienThoai: soDienThoai,
                        gioiTinh: gioiTinh,
                        daKichHoat: 0,
                        maKichHoat:""
                    })
                }
                );

                if(response.ok){
                    setThongBao("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt!");
                }else{
                    console.log(response.json());
                    setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
                }
            } catch (error) {
                setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
            }
        }
    }

    const kiemTraTenDangNhapDaTonTai=async (tenDangNhap:string)=>{
        const url=`http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${tenDangNhap}`;

        try {
            const response = await fetch(url);
            const data=await response.text();
            if(data==="true"){
                setErrorTenDangNhap("Tên đăng nhập dã tồn tại!");
            }
        } catch (error) {
            console.error("Lỗi khi kiểm tra tên đăng nhập: ", error);
            return false;
        }
    }
    const handleTenDangNhapChange= async(e:React.ChangeEvent<HTMLInputElement>)=>{
        setTenDangNhap(e.target.value);

        setErrorTenDangNhap('');
        return kiemTraTenDangNhapDaTonTai(e.target.value);
    }
    //////////////////////////////////////////////

    const kiemTraEmailTonTai=async (email:string)=>{
        const url=`http://localhost:8080/nguoi-dung/search/existsByEmail?email=${email}`;

        try {
            const response = await fetch(url);
            const data=await response.text();
            if(data==="true"){
                setErrorEmail("Email dã tồn tại!");
            }
        } catch (error) {
            console.error("Lỗi khi kiểm tra emailp: ", error);
            return false;
        }
    }
    const handleEmailChange= async(e:React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value);

        setErrorEmail('');
        return kiemTraEmailTonTai(e.target.value);
    }
    /////////////////////////////////////////////////////////////////
    // KIỂM TRA MẬT KHẨU ////////////////////////////////////////////////
    const kiemTraMatKhau = (matKhau: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(matKhau)) {
            setErrorMatKhau("Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)");
            return true;
        } else {
            setErrorMatKhau(""); 
            return false;
        }
    }

    const handleMatKhauChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setMatKhau(e.target.value);
        setErrorMatKhau('');
        return kiemTraMatKhau(e.target.value);
    }

    // KIỂM TRA MẬT KHẨU LẶP LẠI ////////////////////////////////////////////////
    const kiemTraMatKhauLapLai = (matKhauLapLai: string) => {
        if (matKhauLapLai !== matKhau) {
            setErrorMatKhauLapLai("Mật khẩu không trùng khớp.");
            return true;
        } else {
            setErrorMatKhauLapLai(""); // Mật khẩu trùng khớp
            return false;
        }
    }

    const handleMatKhauLapLaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Thay đổi giá trị
        setMatKhauLapLai(e.target.value);
        // Kiểm tra
        setErrorMatKhauLapLai('');
        // Kiểm tra sự tồn tại
        return kiemTraMatKhauLapLai(e.target.value);
    }

    ///////////////////////////////////////////////////////////////////////////////
    return(
        <div className="container">
            <h1 className="mt-5 text-center"></h1>
            <div className="mb-3 col-md-6 col-12 mx-auto">
                <form onSubmit={handleSubmit} className="form">
                    <div className="mb-3">
                        <label htmlFor="tenDangNhap" className="form-label">Tên đăng nhập</label>
                        <input 
                            type="text"
                            id="tenDangNhap"
                            className="form-control"
                            value={tenDangNhap}
                            onChange={handleTenDangNhapChange}
                            />
                            <div style={{color:"red"}}>{errorTenDangNhap}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="text"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange}
                            />
                            <div style={{color:"red"}}>{errorEmail}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Mat khau</label>
                        <input 
                            type="password"
                            id="matKhau"
                            className="form-control"
                            value={matKhau}
                            onChange={handleMatKhauChange}
                            />
                            <div style={{color:"red"}}>{errorMatKhau}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Mat khau lap lai</label>
                        <input 
                            type="password"
                            id="matKhauLapLai"
                            className="form-control"
                            value={matKhauLapLai}
                            onChange={handleMatKhauLapLaiChange}
                            />
                            <div style={{color:"red"}}>{errorMatKhauLapLai}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="hoDem" className="form-label">Họ đệm</label>
                        <input
                            type="text"
                            id="hoDem"
                            className="form-control"
                            value={hoDem}
                            onChange={(e) => setHoDem(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ten" className="form-label">Tên</label>
                        <input
                            type="text"
                            id="ten"
                            className="form-control"
                            value={ten}
                            onChange={(e) => setTen(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="soDienThoai" className="form-label">Số điện thoại</label>
                        <input
                            type="text"
                            id="soDienThoai"
                            className="form-control"
                            value={soDienThoai}
                            onChange={(e) => setSoDienThoai(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gioiTinh" className="form-label">Giới tính</label>
                        <input
                            type="text"
                            id="gioiTinh"
                            className="form-control"
                            value={gioiTinh}
                            onChange={(e) => setGioiTinh(e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Đăng Ký</button>
                        <div style={{ color: "green" }}>{thongBao}</div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default DanKyNguoiDung;