import { useSelector } from "react-redux";

const Navbar = () => {
  const userData = useSelector((store) => store.user);
  console.log("userData", userData);
  return (
    <div className="navbar ">
      <div className="flex-1">
        <a className="btn bbg-base-200tn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none gap-2">
        {userData && (
          <>
            <div> Welcome, {userData.firstName}</div>
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User Photo" src={userData.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
