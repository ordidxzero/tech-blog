import React from 'react';

type ToggleSwitchProps = {
  setter: (state: boolean) => void;
  state: boolean;
  onIcon: JSX.Element;
  offIcon: JSX.Element;
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ setter, state, onIcon, offIcon }) => {
  const onClick = () => setter(!state);
  return (
    <div className="mr-6 select-none">
      <div
        onClick={onClick}
        className="relative w-12 h-7 cursor-pointer bg-gray-200 rounded-3xl flex justify-between items-center px-1"
      >
        {state ? onIcon : <div></div>}
        {!state ? offIcon : <div></div>}
        <div
          className={`w-5 h-5 rounded-full absolute top-1 left-1 bg-gray-500 duration-200 transform ${state && 'translate-x-5'}`}
        ></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
