/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { getPosts } from '../actions/posts';

const MyPagination = ({page}) => {

  const  numberOfPages  = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch,page]);

// console.log(page);
// console.log({numberOfPages});

  return (

    <Pagination
      classes={""}
      count={numberOfPages.numberOfPages}
      page={Number(page)|| 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/allpost?page=${item.page}`} />
      )}
      
    />
  );
};

export default MyPagination;