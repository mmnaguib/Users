import { Button, TextBox } from "devextreme-react";
import { useState, useCallback, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/slices/AuthSlice";
import { UseAppDispatch, UseAppSelector } from "../store/hooks";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = UseAppDispatch();
  const [pass, setPass] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const HandlePass = useCallback((e: SetStateAction<string>) => {
    setPass(e);
  }, []);
  const HandleEmail = useCallback((e: SetStateAction<string>) => {
    setEmail(e);
  }, []);
  const { error, loading } = UseAppSelector((state) => state.auth);
  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userAcc = { email, pass };
    dispatch(loginUser(userAcc)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPass("");
        navigate("/home");
      }
    });
  };
  return (
    <section className="h-100 bg-dark">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-4 d-none d-xl-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                    alt="Sample photo"
                    className="img-fluid"
                    width={400}
                    style={{
                      borderTopLeftRadius: ".25rem",
                      borderBottomLeftRadius: ".25rem",
                    }}
                  />
                </div>
                <div className="col-xl-8">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase text-center">
                      تسجيل الدخول
                    </h3>
                    <form onSubmit={submitHandler}>
                      <div className="row">
                        <div className="col-md-12 mb-4">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form3Example1n"
                            >
                              الايميل
                            </label>
                            <TextBox
                              className="form-control form-control-lg inputFilter col-md-5"
                              placeholder="البريد الإلكتروني"
                              showClearButton={true}
                              value={email}
                              onValueChange={HandleEmail}
                              id="form3Example1m"
                              mode="email"
                            />
                          </div>
                        </div>
                        <div className="col-md-12 mb-4">
                          <div className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="form3Example1n"
                            >
                              كلمة المرور
                            </label>
                            <TextBox
                              className="form-control form-control-lg inputFilter col-md-5"
                              placeholder="كلمة السر"
                              showClearButton={true}
                              value={pass}
                              onValueChange={HandlePass}
                              id="form3Example1n"
                              mode="password"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end pt-3">
                        <Button
                          type="success"
                          className="btn btn-sm ms-2"
                          useSubmitBehavior={true}
                        >
                          {loading ? "Loading" : "دخول"}
                        </Button>
                      </div>
                    </form>
                    <Link
                      to="/register"
                      className="btn btn-success btn-sm ms-2"
                    >
                      تسجيل
                    </Link>
                    {error && (
                      <div className="alert alert-danger">
                        {" "}
                        البريد الالكتروني أو كلمة المرور خطأ ...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
