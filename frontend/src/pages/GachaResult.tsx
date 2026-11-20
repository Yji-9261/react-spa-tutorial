import Button from "../components/Button";
import { Navigate, useLocation, useNavigate } from "react-router";

export default function GachaResult() {
  const navigate = useNavigate();
  const location = useLocation();
  
  function handleHomeTransitionClick(){
    navigate('/home');
  }

  // データ消失時はホーム画面へ
  if( !location.state ){
      return <Navigate to='/home' replace={true}/>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="flex flex-col items-center gap-4 px-10 py-10 border-2 border-indigo-500 rounded-2xl bg-white shadow-lg">
        <h1 className="font-bold text-xl">抽選結果</h1>
        
        <label className="text-sm font-medium text-gray-700">
          {location.state.name}
        </label>
        
        <img src={location.state.imageUrl} alt={location.state.imageAlt}/>

        <label className="text-sm font-medium text-gray-700">
          {location.state.rarityName}
        </label>        

        <span>{"⭐️".repeat(location.state.rarity)}</span>

        <Button type="button" onClick={handleHomeTransitionClick}>
          OK
        </Button>
      </div>
    </main>
  );
}
