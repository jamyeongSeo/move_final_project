import { useState } from "react";
import { Menu, MenuItem, Select } from "@mui/material";
const AdminRegistFrm = (props) => {
    console.log(props);
    const movieTitle = props.movieTitle;
    const setMovieTitle = props.setMovieTitle;
    const movieStatus = props.movieStatus;
    const setMovieStatus = props.setMovieStatus;
    const movieContent = props.movieContent;
    const setMovieContent = props.setMovieContent;
    const movieThumb = props.movieThumb;
    const setMovieThumb = props.setMovieThumb;
    const movieGenre = props.movieGenre;
    const setMovieGenre = props.setMovieGenre;
    const movieGrade = props.movieGrade;
    const setMovieGrade = props.setMovieGrade;
    const movieRuntime = props.movieRuntime;
    const setMovieRuntime = props.setMovieRuntime;
    const movieDirector = props.movieDirector;
    const setMovieDirector = props.setMovieDirector;
    const movieActor = props.movieActor;
    const setMovieActor = props.setMovieActor;
    const movieRelease = props.movieRelease;
    const setMovieRelease = props.setMovieRelease;
    const movieType = props.movieType;
    const setMovieType = props.setMovieType;

    {/* 
    function statusSelet(){
        const [selectedValue, setSelectedValue] = useState();
    }
    const selectedValue = (e) =>{
        setSelectedValue(e.target.value);
    }
    */}
    //포스터 화면 출력용 state
    const [showThumb, setShowThumb] = useState(null);

    // const thumbRef = useRef("");
    //포스터 변경 시 동작 함수
    const changeThumbnail = (e) => {
        const thumb = e.target.files;
        if (files.length !== 0){
            setThumbnail(files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
                setMovieThumb(reader.result);
                //수정 시 , 이미지를 바꾸면 날려야되니까
                if(movieThumb){
                    setMovieThumb(null);
                }
            };
        }else{
            setThumbnail(null);
            setShowThumb(null);
        }
    };

    return (
        <div className="regist-info-wrap">
            <div className="regist-thumb-wrap">
                {movieThumb ? (
                    <img
                    onClick={() =>{
                        thumbRef.current.click();
                    }}
                    src={`${import.meta.env.VITE_BACK_SERVER}/movie/thumb/${movieThumb}`}/>
                ) : showThumb === null ? (
                    <img
                    src="/image/default_img.png"
                    onClick={()=>{
                        thumbRef.current.click();
                    }}/>
                ) : (
                    <img
                    src={showThumb}
                    onClick={()=>{
                        thumbRef.current.click();
                    }}
                    />
                )}
                <input
                // ref={thumbRef}
                type="file"
                accept="image/*"
                style={{display:"none"}}
                onchange={changeThumbnail}
                />
                <div className="regist-thumb-img">포스터 등록</div>
            </div>
            <table className="regist-info-tbl">
                <tr>
                    <th>
                        <label htmlFor="reigst-info">영화 제목</label>
                    </th>
                    <td>
                        <div className="regist-input">
                            <input 
                            type="text"
                            name="regist-title"
                            id="regist-title"
                            value={movieTitle}
                            onChange={(e)=>{
                                setMovieTitle(e.target.value);
                            }}
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label htmlFor="regist-info">등급</label>
                    </th>
                    <td>
                    <Select
                        value={movieGrade}
                        onChange={setMovieGrade}
                    >
                        <MenuItem value="1">개봉예정</MenuItem>
                        <MenuItem value="2">상영중</MenuItem>
                        <MenuItem value="3">상영종료</MenuItem>
                        <MenuItem value="4">재개봉</MenuItem>
                    </Select>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label htmlFor="regist-info">영화 소개</label>
                    </th>
                    <td>
                        <div className="input-info">
                            <input
                            type="text"
                            id="regist-movie-content"
                            name="regist-movie-content"
                            value={onchange = (e)=>{
                                setMovieContent(e.target.value);
                            }}
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label htmlFor="regist-info">영화 장르</label>
                    </th>
                    <td>
                        <Select
                            value={movieGenre}
                            onchange={setMovieGenre}
                            sx={{width:"120px", height: "50px"}}
                            >
                            <MenuItem value="1">액션</MenuItem>
                            <MenuItem value="2">애니메이션</MenuItem>
                            <MenuItem value="3">코미디</MenuItem>        
                            <MenuItem value="4">공포</MenuItem>        
                            <MenuItem value="5">스릴러</MenuItem>        
                            <MenuItem value="6">SF</MenuItem>
                            <MenuItem value="7">범죄</MenuItem>
                            <MenuItem value="8">판타지</MenuItem>                        
                        </Select>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label htmlFor="regist-info">영화 등급</label>
                    </th>
                    <td>
                        <div className="input-info">
                            <input
                            type="number"
                            id="regist-movie-grade"
                            name="regist-movie-grade"
                            value={movieGrade}
                            onchange={onchange=(e)=>{
                                setMovieGrade(e.target.value);
                            }}
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label htmlFor="regist-info">상영시간</label>
                    </th>
                    <td>
                        <div className="input-info">
                            <input
                            type="number"
                            id="regist-movie-runtime"
                            name="regist-movie-runtime"
                            value={movieRuntime}
                            onchange={onchange=(e)=>{
                                setMovieRuntime(e.target.value);
                            }}
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label htmlFor="regist-info">감독명</label>
                    </th>
                    <td>
                        <div className="input-info">
                            <input 
                            type="text"
                            id="regist-movie-director"
                            name="regist-movie-director"
                            value={movieDirector}
                            onchange={(e)=>{
                                setMovieDirector(e.target.value);
                            }}
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label htmlFor="regist-info">주연</label>
                    </th>
                    <td>
                        <div className="input-info">
                            <input
                                type="text"
                                id="regist-movie-actor"
                                name="regist-movie-actor"
                                value={movieActor}
                                onchange={(e)=>{
                                    setMovieActor(e.target.value);
                                }}
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label htmlFor="regist-info">개봉일</label>
                    </th>
                    <td>
                        <div className="input-info"></div>
                        <input
                        type="date"
                        id="regist-movie-release"
                        name="regist-movie-release"
                        value={movieRelease}
                        onchange={(e)=>{
                            setMovieRelease(e.target.value);
                        }}
                        />
                    </td>
                </tr>
                <tr>
                    <th>
                        <label htmlFor="regist-info">영화 상태</label>
                    </th>
                    <td>
                        <Select
                            value={movieStatus}
                            onchange={setMovieGenre}
                            sx={{width:"120px", height: "50px"}}
                            >
                            <MenuItem value="1">액션</MenuItem>
                            <MenuItem value="2">애니메이션</MenuItem>
                            <MenuItem value="3">코미디</MenuItem>        
                            <MenuItem value="4">공포</MenuItem>        
                            <MenuItem value="5">스릴러</MenuItem>        
                            <MenuItem value="6">SF</MenuItem>
                            <MenuItem value="7">범죄</MenuItem>
                            <MenuItem value="8">판타지</MenuItem>                        
                        </Select>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default AdminRegistFrm;