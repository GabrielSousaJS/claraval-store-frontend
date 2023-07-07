import "./styles.css";

import { Order } from "types/order";

import * as formatters from "../../../../utils/formatters";
import * as userService from "../../../../services/user-service";
import * as orderService from "../../../../services/order-service";
import { useEffect, useState } from "react";
import { User } from "types/user";
import FormSelect from "components/FormSelect";
import { dirtyAndValidate, toValues, updateAndValidate } from "utils/forms";
import { selectStyles } from "utils/select";

type Props = {
  order: Order;
};

export default function OrderCard({ order }: Props) {
  const [formData, setFormData] = useState<any>({
    orderStatus: {
      value: '',
      id: "orderStatus",
      name: "orderStatus",
      placeholder: "Status",
      validation: function (value: string) {
        return true;
      },
      message: "Campo inválido",
    },
  });

  const options = [
    { value: "ENVIADO", label: "ENVIADO" },
    { value: "ENTREGUE", label: "ENTREGUE" },
  ];

  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUserById();
  }, []);

  async function getUserById() {
    await userService.getById(Number(order.clientId)).then((response) => {
      setUser(response.data);
    });
  }

  useEffect(() => {
    addStatusInSelect();
  }, []);

  function addStatusInSelect() {
    let value = order.orderStatus;
    let label = order.orderStatus;
    const newFormData = {...formData, orderStatus: {...formData.orderStatus, value: {value, label}}};
    setFormData(newFormData);
  }

  function handleTurnDirty(name: string) {
    setFormData(dirtyAndValidate(formData, name));
  }

  async function handleUpdateStatus(event: any) {
    const formated = toValues(formData);
    const request = formated.orderStatus.value;

    await orderService.updateOrderStatus(Number(order.id), request);
  }

  return (
    <div className="base-card order-card-container mb-3">
      <div className="row order-info">
        <p className="col-md-3 text-start order-text-item">{user?.name}</p>
        <p className="col-md-3 order-text-item">{formatters.formatDate(order.moment)}</p>
        <div className="col-md-3 order-text-item">
          <FormSelect
            {...formData.orderStatus}
            styles={selectStyles}
            className="claraval-form-control form-select-container"
            options={options}
            onChange={(obj: any) => {
              const newFormData = updateAndValidate(
                formData,
                "orderStatus",
                obj
              );
              setFormData(newFormData);
            }}
            onTurnDirty={handleTurnDirty}
          />
          <div className="form-error">{formData.orderStatus.message}</div>
        </div>
        <div className="col-md-1"></div>
        <button
          className="col-md-2 align-center btn btn-secondary btn-order-item"
          onClick={handleUpdateStatus}
        >
          SALVAR
        </button>
      </div>
    </div>
  );
}
