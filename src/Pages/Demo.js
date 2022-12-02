import { React, useContext } from "react";
import { menuContext } from "../../Components/Hooks/MenuContext";

const Demo = () => {
  const { hamBurger } = useContext(menuContext);

  return (
    <>
      <div
        className={
          hamBurger
            ? "absolute top-[75px] right-[5px] left-[100px] transition-all"
            : "absolute top-[75px] right-[5px] left-[300px] transition-all"
        }
      >
         <h1 className='text-center font-bold'>Hi</h1>
      </div>
    </>
  );
};

export default Demo;
