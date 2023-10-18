import { SelectBox } from "devextreme-react";
import { TextBox } from "devextreme-react/text-box";
import { Button } from "devextreme-react/button";
import {
  Export,
  Paging,
  Column,
  Editing,
  DataGrid,
  Pager,
} from "devextreme-react/data-grid";
import { UseAppDispatch, UseAppSelector } from "../store/hooks";
import { useState, useEffect, useCallback, SetStateAction, useMemo } from "react";
import { getUsers } from "../store/slices/UserSlice";
import { UserType } from "../types/Type";
import "../assets/css/UserList.css";
function User() {
  const users = UseAppSelector((state) => state.user.users);
  const dispatch = UseAppDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const [idsearch, setIdSearch] = useState("");
  const [namesearch, setNameSearch] = useState("");
  const [GvDataSource, setGvDataSource] = useState<UserType[]>([]);
  const [visibleGrid, setvisibleGrid] = useState<boolean>(false);
  const [noUser, setNoUser] = useState<boolean>(false);
  const idHandler = useCallback((v: SetStateAction<string>) => {
    setIdSearch(v);
  }, []);
  const nameHandler = useCallback((e: { name: SetStateAction<string> }) => {
    setNameSearch(e.name);
  }, []);

  const userFilter = () => {
    if (idsearch == "" && namesearch == "") {
      setGvDataSource(users);
      setvisibleGrid(true);
      setNoUser(false);
    }
    if (idsearch == "" && namesearch !== "") {
      const user = users.filter((el) => el.name == namesearch);
      setGvDataSource(user);
      setvisibleGrid(true);
      setNameSearch("");
      setNoUser(false);
    }
    if (idsearch !== "" && namesearch == "") {
      const user = users.filter(
        (el) => el.id.toString().indexOf(idsearch) !== -1
      );
      setGvDataSource(user);
      setvisibleGrid(true);
      setIdSearch("");
      setNoUser(false);
    }
    if (idsearch !== "" && namesearch !== "") {
      setNoUser(true);
      setvisibleGrid(false);
      setIdSearch("");
      setNameSearch("");
    }
  };
  const userId = useMemo (() => {
    return(
        <TextBox
            className="inputFilter col-md-5"
            placeholder=" ابحث برقم الهوية"
            showClearButton={true}
            value={idsearch}
            onValueChange={idHandler}
        />
    )
  },[idHandler, idsearch])
  const usersList = useMemo(() => {
    return (
        <SelectBox
        className="inputFilter col-md-5"
        placeholder="ابحث بجزء من الاسم"
        dataSource={users}
        value={namesearch}
        onValueChange={nameHandler}
        displayExpr="name"
        searchEnabled={true}
      ></SelectBox>
    );
  }, [nameHandler, namesearch, users]);
  return (
    <div className="content">
      <div className="container-fluid usersList">
        <div className="upperDiv">
          <h2>بحث المستخدمين</h2>
          <div className="row userFilter">
            {userId}
            {usersList}
            <Button
              className="btn-sm btnSearch col-md-1"
              type="success"
              text="بحث"
              onClick={userFilter}
            />
          </div>
        </div>
        {visibleGrid && (
          <div className="userDataGrid">
            <DataGrid
              visible={visibleGrid}
              dataSource={GvDataSource}
              allowColumnReordering={false}
              showBorders={true}
            >
              <Column
                dataField="id"
                caption="رقم الهوية"
                alignment="right"
              ></Column>
              <Column
                dataField="name"
                caption="الاسم"
                alignment="right"
              ></Column>
              <Column
                dataField="username"
                caption="اسم الدخول"
                alignment="right"
              ></Column>
              <Column
                dataField="email"
                caption="البريد الالكتروني"
                alignment="right"
              ></Column>
              <Column
                dataField="phone"
                caption="رقم الهاتف"
                alignment="right"
              ></Column>
              <Column
                dataField="website"
                caption="الموقع الالكتروني"
                alignment="right"
              ></Column>
              <Editing mode="popup" allowUpdating={true} useIcons></Editing>
              <Paging enabled={true} defaultPageSize={5} />
              <Pager showPageSizeSelector={true} showInfo={true} />
              <Export enabled={true} />
            </DataGrid>
          </div>
        )}
        {noUser && <div className="alert alert-danger">لا يوجد بيانات </div>}
      </div>
    </div>
  );
}

export default User;
