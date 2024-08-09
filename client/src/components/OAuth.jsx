import { Button } from "flowbite-react"
import { FcGoogle } from "react-icons/fc";



function OAuth() {
  return (
    <div>
      <Button className="w-full mt-2" type="button" gradientDuoTone='pinkToOrange' outline>
        <FcGoogle className="w-6 h-6 mr-2" />
         Sign In with Google
        </Button>
    </div>
  )
}

export default OAuth