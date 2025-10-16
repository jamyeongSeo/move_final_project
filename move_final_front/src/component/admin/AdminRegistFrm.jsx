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

    return (
        <div className="regist-info-wrap">
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
                        <Select value={movieGrade}
                        onValueChange={setMovieGrade}>
                        <SelectTrigger className="movieGrade">
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1">개봉예정</SelectItem>
                            <SelectItem value="2">상영중</SelectItem>
                            <SelectItem value="3">상영종료</SelectItem>
                            <SelectItem value="4">재개봉</SelectItem>
                        </SelectGroup>
                        </SelectContent>
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
                        <label htmlFor="regist-info">영화 포스터</label>
                    </th>
                    <td>
                        <div className="input-info">
                            <input
                            type="text"
                            id="regist-movie-thumb"
                            name="regist-movie-thumb"
                            value={movieThumb}
                            onchange={(e)=>{
                                setMovieThumb(e.target.value);
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
                        <div className="input-info">
                            <input
                            type="number"
                            id="regist-movie-genre"
                            name="regist-movie-genre"
                            value={movieGenre}
                            onChange={onchange=(e)=>{
                                setMovieGenre(e.target.value);
                            }}
                            />
                        </div>
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
                        {/*달력으로 날짜 받기 */}
                    </td>
                </tr>
                <tr>
                    <th>
                        <label htmlFor="regist-info">영화 상태</label>
                    </th>
                    <td>
                        <div className="input-info">
                            {/*셀렉트 버튼 사용 */}
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default AdminRegistFrm;