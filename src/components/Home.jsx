import React , {useState , useEffect, useRef} from "react";

const Home = () => {

    const init = {
        search: "",
    }

    const [state , setState] = useState(init);
    const [result , setresult] = useState([]);

    const ref = useRef()
          
   
    useEffect(() => {
         fetch("https://jsonplaceholder.typicode.com/posts")
                .then((response) => {
                    return(
                        response.json()
                    )
                })
                .then((data) => {  
                    if(ref.current.checked){
                        setresult(data.sort((a , b) => a.title.localeCompare(b.title)))    
                        console.log(result);
                    }else{
                        setresult(data)
                    }
                                               
                })
                .catch((error) => {
                    console.log(error);
                })  
    })

    const handlechange = (e) => {
        e.preventDefault()
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
        
    }

    return(
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 cs">
                            <div className="searchbar colsearch">
                                <div className="form">
                                    <input type="search" name="search" id="search" className="search" placeholder='Mots à Rechercher' onChange={handlechange} />   
                                </div>
                                <div className="trie">
                                    <span className="italic">Trie par ordre:</span> &nbsp; &nbsp; &nbsp; &nbsp; 
                                    <input className="label" ref={ref} type="checkbox" name="checkbox" id="checkbox" value="alpha" />&nbsp; <span className="alphabetique"><label className="label" htmlFor="checkbox">A à Z</label></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="container-fluid">
                <div className="container">
                        {/* <div className="row">
                            <div className="col-lg-12">
                                <div className="searchbar colsearch">
                                    <div className="form">
                                         <input type="search" name="search" id="search" className="search" placeholder='Mots à Rechercher' onChange={handlechange} />   
                                    </div>
                                    <div className="trie">
                                        <span className="italic">Trie par ordre:</span> &nbsp; &nbsp; &nbsp; &nbsp; 
                                        <input className="label" ref={ref} type="checkbox" name="checkbox" id="checkbox" value="alpha" />&nbsp; <span className="alphabetique"><label className="label" htmlFor="checkbox">Alphabetique</label></span>
                                    </div>
                                </div>
                            </div> */}
                        {/* </div> */}
                        <div className="row">      
                                <div className="col-lg-12 pt-5">
                                    {result && 
                                        result
                                        .filter((resultat) => {
                                            if(state.search === ""){
                                                    return resultat                              
                                            }else if (resultat.title.toLowerCase().includes(state.search.toLowerCase())){
                                                return resultat
                                            }
                                        })
                                        .map((resultat , index) =>(
                                            <div className="container-fluid" key={resultat.id}>
                                                <div className="container">
                                                    <div className="alldata"  >
                                                        <div className="id">
                                                            <div className="idk">
                                                                {resultat.id}
                                                            </div>
                                                        </div>
                                                        <h4 className="h4">{resultat.title}</h4>
                                                        <p className="p1">{resultat.body}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                        </div>
                </div>
            </div>
            


        </>
    )
}

export default Home;

