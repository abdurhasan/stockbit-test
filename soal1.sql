SELECT users.ID , users.UserName , parents.UserName as 'ParentUserName' FROM USER users
LEFT JOIN USER parents ON users.Parent = parents.id 
ORDER BY users.id ASC 