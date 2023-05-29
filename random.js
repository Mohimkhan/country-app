// // const cards = document.querySelectorAll(".card");

// // const observer = new IntersectionObserver(entries => {
// //   entries.forEach(entrie => {
// //     entrie.target.classList.toggle('show', entrie.isIntersecting);
// //   })
// // }, {
// //   rootMargin: "-50px"
// // })

// // cards.forEach(card => {
// //   observer.observe(card);
// // })

// // implementing infinite scrolling 
// let limit = 7;
// let pageCount = 1;
// let post = 1;

// const container = document.querySelector('.container');

// const getData = async () => {
//   let limit = 4;
//   let page = 1;
//   const res = await fetch(`https://restcountries.com/v3.1/all?offset=0&limit=${limit}`);
//   const data = await res.json();

//   console.log(data);

//   data.map((curEle) => {
//     // console.log(curEle?.name?.common);
//     // console.log(curEle);
//     const htmlData = `
//       <div class="posts">
//         <p class="post-id">${curEle?.population}</p>
//         <p class="title">${curEle?.name?.official}</p>
//         <img class="post-img" src="${curEle?.flags?.svg}"/>
//         <p class="post-info">${curEle?.flags?.alt}</p>
//       </div>
//     `;
//     container.innerHTML += htmlData;
//   })
// }

// getData();

// const showData = () => {
//   setTimeout(() => {
//     pageCount++;
//     getData();
//   }, 300)
// }

// window.addEventListener('scroll', () => {
//   const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

//   if (scrollTop + clientHeight >= scrollHeight) {
//     showData();
//   }
// })

const urlParams = new URLSearchParams(window.location.search);
const newSearchParams = urlParams.append("currency", "$");
for (const [key, value] of urlParams.entries()) {
  console.log(key, value, window.location.search);
}