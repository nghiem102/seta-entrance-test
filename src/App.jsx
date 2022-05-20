import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { createPost, getPosts } from "./features/postSlice"



function App() {

  //javascrip test
  const array1 = ['a', 'ab', 'abc', 'cd', 'def', 'gh']
  const array2 = [1, 4, 2, 3, 5]

  // question 1
  const myFunction = (array) => {
    // const arraySortByLength = array.map(item => item.length)
    // const groupByArray = arraySortByLength.reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {})
    // const arrayLength = Object.entries(groupByArray).sort((a, b) => {
    //   const [keyA,valueA] = a
    //   const [keyB,valueB] = b
    //   return valueB - valueA
    // })
    // const [key,value] = arrayLength[0]

    // const result = array.filter(item => item.length === Number(key))
    // console.log(result);

    let max = 0;
    let index = -1;
    let counter = {};

    array.map((item) => item.length)
      .forEach((length) => {
        const count = (counter[length] || 0) + 1;
        if (max < count) {
          max = count;
          index = length;
        }
        counter[length] = count;
      });
      const result = array.filter(item => item.length === Number(index))
    console.log(result);
  }

  myFunction(array1)

  //question 2
  const sum = (array) => {
    const sortArray = array.sort((a, b) => {
      return b - a
    })
    const sum = sortArray[0] + sortArray[1]
    return sum
  }


  console.log(sum(array2));


  // React Test

  const data = useSelector(posts => posts.posts.value)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getPosts())
  }, [])

  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    dispatch(createPost(data))
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" {...register('title')} id='title' />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input type="text" {...register('body')} id='body' />
        </div>
        <button>submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>body</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(item => (
            <tr key={item.id} style={{ paddingBottom: '20px' }}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
