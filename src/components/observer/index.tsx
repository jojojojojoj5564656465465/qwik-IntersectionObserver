import { $, component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { useIntersectionObserverIsCenterScreen2 } from "./hook";
import styles from "./observer.css?inline";

export default component$(() => {
  useStyles$(styles);
  const squareRef = useSignal<HTMLElement>();

  const isInCenterOfScreen = useIntersectionObserverIsCenterScreen2(
    squareRef,
    false,
    {
      threshold: 0.9,
    }
  );
  // const fnObserver = $((entry: IntersectionObserverEntry) => {
  //   if (entry.isIntersecting) {
  //    console.log("The square is intersecting the viewport.");
  // }});

  // const observer = new IntersectionObserver((entries) => {
  //   entries.forEach(fnObserver);
  // });

  //  observer.observe(squareRef.value as Element);
  return (
    <section class="section1">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, mollitia
        placeat hic autem ea, reprehenderit impedit accusamus magni
        necessitatibus, quibusdam tenetur corporis? Atque quis soluta hic esse,
        dicta minus perferendis? Autem, nostrum blanditiis nesciunt dolorum
        facilis aut, deleniti voluptatum iusto asperiores ut ratione dignissimos
        doloribus placeat temporibus fuga numquam! Odio quisquam unde
        repellendus deleniti beatae. Magni quos minus, quis soluta laboriosam
        tempora modi a quisquam molestiae fugit ducimus! Laudantium, dolore,
        ullam ex atque illo cumque, debitis consectetur in minus reprehenderit
        molestias animi qui voluptas quaerat ducimus repellat totam harum ut
        sit? Autem cupiditate laudantium illum odio aliquam, debitis ad
        temporibus itaque quisquam ipsum aut nam officia exercitationem ratione
        impedit error suscipit in veniam quaerat accusantium nemo fugiat soluta!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, atque!
        Eaque, quod tempore maxime commodi dolore ab tempora corrupti, eius,
        blanditiis nobis laboriosam odio dignissimos provident voluptates
        excepturi dolores nam! Fugiat assumenda, aspernatur hic ea non debitis
        quo commodi ex molestiae veritatis voluptates sequi illum voluptate
        incidunt error iste perspiciatis. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Ipsa, dolores aliquid blanditiis enim
        suscipit maiores, aperiam voluptates quasi dolore dolor voluptatum
        laborum laudantium quaerat aut quisquam labore quos molestiae vitae
        fugiat nostrum earum dolorem. Earum sed velit in vitae rem, eius, ad,
        magnam voluptates iure voluptatem officia! Odit magnam, voluptate
        provident ratione, officiis maiores inventore deleniti doloribus tempore
        aperiam delectus? Quo, incidunt. Laudantium ex exercitationem, totam
        veniam non, praesentium vitae, illo quidem repellendus ullam illum eaque
        minus quibusdam ratione optio? Quia omnis odit, eius ut non nobis
        quisquam deserunt quae dolore in enim eligendi, fugit voluptates iure
        impedit. Ex at corrupti non velit quia, sapiente nobis labore nam
        voluptas esse consectetur itaque obcaecati? Fugit animi, aliquid
        recusandae suscipit ratione tempore. Nemo perspiciatis est blanditiis
        corrupti inventore soluta accusantium culpa quia sunt! Animi dolorum,
        magnam, accusamus corporis similique voluptatem esse maiores laudantium
        aperiam molestias veritatis eaque minus modi quidem consequatur
        praesentium deserunt commodi? Provident quae sequi rerum, culpa
        explicabo quo nulla quidem eligendi ea. Magni neque corporis, totam
        recusandae ex cumque culpa pariatur dolor magnam itaque obcaecati ipsum
        nihil, sunt dolores amet optio in rem eaque accusantium. Corrupti libero
        incidunt sint reiciendis officia soluta quisquam fugit molestiae placeat
        ad laborum labore, nisi, ullam maiores minima illum impedit expedita
        suscipit provident a voluptatum? Impedit nulla consequuntur sunt quos
        magni officia quisquam atque repudiandae maxime animi. Quae a, eligendi
        itaque, iste consectetur nulla est, dolorem doloremque reprehenderit vel
        pariatur sint dolore. Suscipit in, quisquam voluptate itaque officia
        amet debitis mollitia. Natus, culpa suscipit, neque earum fugit, quos
        maiores rem impedit numquam sint animi vel! Soluta officiis ullam sit
        atque cumque? Perferendis error ullam amet aliquid, optio blanditiis,
        necessitatibus odit molestias nobis neque minus fuga tempora enim
        cupiditate quos facilis et fugit ipsam modi similique unde delectus! Vel
        aut fugiat quia quidem porro, consequatur, modi dignissimos cupiditate
        tempora itaque accusamus eius id maxime quisquam quos hic. Similique ut
        tempora id! Optio quibusdam blanditiis nemo perspiciatis sunt!
        Obcaecati, nobis magnam molestias fugiat velit tenetur deleniti
        eligendi, consequuntur similique doloribus deserunt nemo error est
        maiores debitis architecto repellat amet? Hic suscipit maiores sequi.
        Veniam corporis consectetur explicabo quidem dolorem animi, error,
        labore modi vel unde optio iste quaerat veritatis itaque id quis earum
        iure? Non provident ea aliquid perferendis ab ad quisquam harum neque id
        qui quae iusto, quibusdam, a expedita libero in numquam vitae facere,
        sequi laudantium inventore! Eos vel ab nobis! Quas ipsa beatae
        temporibus aut aliquid laborum fugit quae blanditiis rerum, numquam
        ratione molestiae modi doloribus tempora id, porro exercitationem
        doloremque molestias, reprehenderit eligendi totam! Distinctio, ratione
        fuga dolorum recusandae iure perspiciatis iusto voluptatem accusamus.
        Inventore at, modi animi vero cum dolor nesciunt expedita repellat
        temporibus eligendi nisi facilis esse, aliquam eveniet possimus? Minima
        alias magnam tenetur iusto, culpa maiores illo exercitationem. Tempore
        cumque quaerat ipsa. Voluptatum, pariatur blanditiis. Reiciendis
        necessitatibus deleniti voluptates voluptas cum perferendis ullam sunt
        omnis quibusdam, exercitationem ut iste rerum quisquam enim quasi
        doloribus numquam veritatis magni? Cum laudantium qui sapiente
        exercitationem modi quisquam dicta perspiciatis optio nemo ea?
      </p>
      <span
        ref={squareRef}
        class={`redSquare ${isInCenterOfScreen.value ? "rotating" : "notrotating"}`}
      >
        {isInCenterOfScreen.value ? "true" : "false"}
      </span>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
        blanditiis natus animi ratione, ipsum atque unde? Animi, obcaecati.
        Optio dolorem a sit, quod voluptates, amet quos obcaecati, voluptas
        inventore non iure ipsam praesentium necessitatibus odio ipsa? Numquam
        odio magnam est omnis! Obcaecati, sequi modi repellat soluta explicabo
        tempore libero quo dolorem. Sed beatae aperiam eos repellendus corrupti,
        aliquam incidunt ullam ducimus rerum quibusdam! Consectetur, id.
        Suscipit, dicta perspiciatis! Quae itaque atque, tempora quod pariatur
        cupiditate fugiat? Nam dignissimos veniam quas fuga nobis reiciendis
        dicta, vel sit? Sapiente voluptatum maxime corrupti, obcaecati ratione
        atque quia explicabo? Praesentium accusamus repellat fugit quaerat.
      </p>
    </section>
  );
});
