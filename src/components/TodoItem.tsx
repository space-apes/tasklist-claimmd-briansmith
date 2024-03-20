import React, { FC, useState} from "react";
import styled from "@emotion/styled";

const ToDoContainer = styled.div({
  display:"flex"
});

const DeleteButton = styled.button({
  backgroundColor: "red",
  width: "10%"
});


export const Wrapper = styled.label({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  background: "white",
  fontWeight: "400",
  fontSize: 14,
  cursor: "pointer",
});

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  fontSize: 20,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
});

export interface TodoItemProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean, id:string) => void;
  onDelete?: (id: string) => void; 
}


export const TodoItem: FC<TodoItemProps> = ({
  id,
  label,
  checked = false,
  onChange,
  onDelete
}) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  
  return (

    <ToDoContainer
        onMouseEnter={()=>setShowDeleteButton(true)}
        onMouseLeave={()=>setShowDeleteButton(false)}
    >
      <Wrapper>
        <Checkbox
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked, id)}
        />
        <Label checked={checked}>{label}</Label>
      </Wrapper>
      {showDeleteButton && 
        <DeleteButton onClick={()=> onDelete(id)}>x</DeleteButton>}
    </ToDoContainer>
  );
};
