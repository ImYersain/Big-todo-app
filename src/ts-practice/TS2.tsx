import React, { ComponentType, FC } from "react";
import { compose } from "redux";

//HOC1
function HOC1<WP extends { count: number }>(
  WrappedComponent: ComponentType<WP>
) {
  const NewComponent: FC<Omit<WP, "count">> = (props) => {
    return (
      <div>
        <WrappedComponent {...(props as WP)} count={10} />
      </div>
    );
  };

  return NewComponent;
}

//HOC2
function HOC2<WP extends { text: string }>(
  WrappedComponent: ComponentType<WP>
) {
  const NewComponent: FC<Omit<WP, "text">> = (props) => {
    return (
      <div>
        <WrappedComponent {...(props as WP)} text={"hello"} />
      </div>
    );
  };

  return NewComponent;
}

interface IComponentType {
  title: string;
  count: number;
  text: string;
}
const Component1: FC<ComponentType> = (props) => {
  return <div>{props.title}</div>;
};

// const Component1Container = HOC1(Component1);
// const Component1Container2 = HOC2(Component1Container);
type FromHOC1Type = ComponentType<Omit<IComponentType, "count">>;
type FromHOC2Type = ComponentType<Omit<FromHOC1Type, "text">>;

const Component1Container2 = compose<
  FromHOC1Type,
  ComponentType<IComponentType>,
  FromHOC2Type
>(
  HOC2,
  HOC1
)(Component1);

const App = () => {
  return <Component1Container2 title={"title"} />;
};
