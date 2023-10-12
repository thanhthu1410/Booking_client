import { useDispatch } from "react-redux";
import RouteSetup from "./routes/RouteSetup"
import { useEffect } from "react";
import api from "./services/api";
import { timeAction } from "./stores/slices/time.slice";
function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    api.timeApi.findAll()
      .then(res => {
        if (res.status == 200) {
          console.log("res", res.data.data);
          dispatch(timeAction.setData(res.data.data));
        }
      })
  }, [])

  return (
    <>
      <RouteSetup />
    </>
  )
}

export default App
