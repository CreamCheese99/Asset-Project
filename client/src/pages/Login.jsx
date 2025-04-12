import FormLogin from "../components/FormLogin"


function Login() {
  return (
    // <div   className="  flex justify-center items-center h-screen">
   <div className= "flex justify-center items-start min-h-screen pt-10">
      <div className="w-full h-auto pt-2 pb-6 flex flex-col justify-start items-center gap-6">
        <FormLogin />
      </div>
    </div>
  )
}

export default Login
