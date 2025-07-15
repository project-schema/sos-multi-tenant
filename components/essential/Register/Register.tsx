import Style from "./Register.style.module.css";
import Logo from "../../../../public/images/LoginLogo.png";
import Image from "next/image";
import { ST } from "next/dist/shared/lib/utils";

function RegisterForm() {
  return (
    <section className={Style.loginBg}>
      <div className="layout ">
        <div className={Style.layoutBgImg}>
          <div className={Style.loginFormBox}>
            <div className={Style.LoginImg}>
              <Image
                className={Style.singleChooseImg}
                src={Logo}
                alt="Choose Us Images"
              />
            </div>
            <div className={Style.loginFromHeading}>
              <h3>Create an Account Create Own Startup</h3>
            </div>
            <form action="">
              <div>
                <label className={Style.loginLabel} htmlFor="name">
                  Name
                </label>
              </div>
              <div>
                <input
                  className={Style.loginInput}
                  placeholder="Enter your name"
                  type="text"
                />
              </div>

              <label className={Style.loginLabel}>Register as</label>
              <select className={Style.loginInput} name="pets" id="pet-select">
                <option value="User">User</option>
                <option value="Affiliate">Affiliate</option>
                <option value="Vendor">Vendor</option>
              </select>

              {/* <div className={Style.loginReFor}>
                                <div className={Style.loginRadio}>
                                    <input type="radio"/>
                                    <p>Remember me</p>
                                </div>
                                <div>
                                    <a className={Style.forgatPassword} href="#">Forgot password?</a>
                                </div>
                            </div> */}
              <div className={Style.registerFormFildWP}>
                <div className={Style.registerFormFild}>
                  <div>
                    <label className={Style.loginLabel} htmlFor="name">
                      Email
                    </label>
                  </div>
                  <div>
                    <input
                      className={Style.loginInput}
                      placeholder="Enter your mail"
                      type="mail"
                    />
                  </div>
                </div>
                <div className={Style.registerFormFild}>
                  <div>
                    <label className={Style.loginLabel} htmlFor="name">
                      Number
                    </label>
                  </div>
                  <div>
                    <input
                      className={Style.loginInput}
                      placeholder="Enter your number"
                      type="number"
                    />
                  </div>
                </div>
              </div>
              <div className={Style.registerFormFildWP}>
                <div className={Style.registerFormFild}>
                  <div>
                    <label className={Style.loginLabel} htmlFor="name">
                      Password
                    </label>
                  </div>
                  <div>
                    <input
                      className={Style.loginInput}
                      placeholder="Type a strong password"
                      type="password"
                    />
                  </div>
                </div>
                <div className={Style.registerFormFild}>
                  <div>
                    <label className={Style.loginLabel} htmlFor="name">
                      Confirm Password
                    </label>
                  </div>
                  <div>
                    <input
                      className={Style.loginInput}
                      placeholder="Confirm Password"
                      type="password"
                    />
                  </div>
                </div>
              </div>

              <div className={Style.checkboxWrapper}>
                <div>
                  <input
                    className={Style.checkFild}
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                  />
                  
                </div>
                <div>
                  <label>
                    {" "}
                    I agree to all of <a className={Style.checkText} href="#">terms & conditions</a>
                  </label>
                </div>
              </div>
              <div className={Style.loginButton}>
                <button className={Style.loginBtn}>Register Now</button>
              </div>
              <div className={Style.goRegister}>
                <p>
                  Already have an account?{" "}
                  <a
                    className={Style.loginGoRLink}
                    href="http://localhost:3000/login"
                  >
                    Log in
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;
