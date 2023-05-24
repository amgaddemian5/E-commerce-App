import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { useEffect } from "react";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = ({ query }) => {
  const [filtterCategories, setfiltterCategories] = useState(categories);
  useEffect(() => {
    if (query != "") {
      let data = categories.filter((catrgory) => {
        let title = catrgory.title.toLowerCase();
        return title.includes(query.toLowerCase());
      });
      setfiltterCategories(data);
    } else {
      setfiltterCategories(categories);
    }
  }, [query]);
  return (
    <Container>
      {filtterCategories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
