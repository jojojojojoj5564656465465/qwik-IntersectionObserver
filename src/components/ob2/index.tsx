import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";
import { useIsCenterOfScreen } from "./center";
import { useIntersectionObserver } from "./useIntersectionObserver";
const emoji = (x:boolean | undefined) => x ? "✅" : "❌";
export const Obs2 = component$(() => {
  const square = useSignal<HTMLElement>();
  const onceObserver = true;

  const isVisible = useIntersectionObserver(square, onceObserver, { threshold: 0.1 })
  const isCentered = useIsCenterOfScreen(square, isVisible);

  const stayTrue = useSignal<boolean>(false); 

  const isCenterdAndVisible = useComputed$(() => {
    return isVisible.value && isCentered.value;
  });

  useTask$(({ track }) => {
    track(() => isVisible.value);
    track(() => isCentered.value);
    if (onceObserver && isVisible.value && isCentered.value){
      stayTrue.value = true;
    }
    
  })
  useTask$(({ track }) => {
    track(() => isVisible.value);
    track(() => isCentered.value);

    console.log(
      `[Observer] ↕️  isVisible: ${isVisible.value ? "✅" : "❌"} centered: ${isCentered.value ? "✅" : "❌"}`,
    );
  })

  return (
    <section class="section-ob2">
      <h2>Composant Obs2</h2>
      <p>
        r
        iure quam vitae magnam reprehenderit deleniti deserunt distinctio ipsa
        repellendus porro dolore atque vero aut? Repudiandae neque magni ducimus
        amet odit quae dolorem! Perspiciatis, at, dolor voluptas eum vero ullam
        cum assumenda dolorum officia nemo rem! At non dolores hic, incidunt
        distinctio doloribus aut aliquam ducimus libero temporibus animi aliquid
        fugit laborum maiores, labore eum sapiente nostrum odit eius quas! Sequi
        natus laborum distinctio neque repellat quisquam? Consequuntur
        laboriosam eveniet tempore consectetur iusto id numquam repellendus, ex
        voluptatum? In, incidunt exercitationem. Dignissimos molestias adipisci
        
        reiciendis nesciunt ratione? Saepe rem perferendis nisi, ullam, corporis
        assumenda dolorum reprehenderit quod magni sit, deserunt cumque ut
        nobis. Repellendus optio possimus, odit suscipit nesciunt, earum neque
        culpa mollitia, dolore rem iste? Atque eius totam ratione repudiandae
        dolor, molestiae nisi asperiores, voluptatibus rerum iusto nostrum
        deleniti. Iste voluptates, veniam temporibus, ipsam asperiores
        reiciendis voluptatem ullam doloremque illum eius consectetur illo qui
        ad quam consequatur vel quae quaerat blanditiis porro. Officiis sunt
        quaerat laborum tempora quod magni cum. Id eos reprehenderit praesentium
        tempora, est ipsam debitis totam quam. Sed, minima vero odit sapiente
        rerum voluptatem blanditiis nemo modi nihil ratione commodi iusto. Enim
        doloremque dolor corporis molestiae praesentium ipsa illo inventore
        delectus illum nesciunt. Esse exercitationem perferendis laboriosam eius
        vero voluptate eligendi sequi expedita iure, quam assumenda aliquid
        asperiores doloremque amet iste neque minus deserunt nostrum! Sapiente
        explicabo laudantium itaque. Quasi consectetur numquam nulla laboriosam,
        quas tenetur ducimus blanditiis repellendus alias unde earum eaque
        dignissimos impedit omnis rem esse aliquam aspernatur suscipit
        reiciendis facere illo quis! Assumenda natus consequatur eligendi
        corrupti recusandae, praesentium accusamus laudantium possimus
        exercitationem nesciunt nulla, eos, corporis numquam blanditiis!
        Placeat, inventore. Laudantium id veniam aut eligendi quidem corrupti
        quas, veritatis quia earum minima esse dicta, cumque cupiditate impedit
        suscipit tenetur debitis voluptate culpa facilis nostrum quod libero eos
        officiis sit. Sunt similique ipsum, atque quibusdam dolor fuga
        consequatur fugiat impedit minima quos error, maiores molestias illum
        asperiores aliquid dignissimos facere adipisci rem eaque! Saepe vero
        veritatis laudantium ullam architecto quidem culpa eum sunt repellat
        neque inventore suscipit et facilis natus laboriosam modi, corporis
        optio fugiat delectus soluta accusamus? Nam necessitatibus voluptate
        doloribus esse, eius natus corrupti dignissimos, aliquid enim qui
        molestiae, nisi tempore veniam eum iusto voluptates quasi accusantium
        tenetur. Repellendus eum assumenda quaerat saepe deleniti, vel quia quis
        quidem voluptates! Natus in optio vero quas alias ex ea vel similique
        nisi magnam, possimus amet, recusandae sequi excepturi illum fugit
        aliquam fugiat quibusdam? Neque, amet. Provident corporis culpa earum,
        eum quis consequatur. Deserunt nostrum ad alias impedit labore rerum
        voluptatibus eum recusandae saepe laboriosam quia cumque, qui sequi,
        possimus nesciunt! Voluptatem commodi ea beatae magnam temporibus. Optio
        iure tempore et corrupti, nobis voluptates doloremque, sint excepturi id
        modi similique veritatis voluptas assumenda sequi error obcaecati porro
        laudantium aut omnis quidem odit! Qui ratione, praesentium atque ducimus
        maxime exercitationem fuga inventore cumque soluta? Beatae quod
        voluptate atque a aperiam? Vitae et ab veritatis ad officiis ipsa amet
        tempora voluptatibus dicta sequi odio aliquid cum obcaecati repellat,
        possimus aspernatur! Error qui ullam magnam dolorum ex magni odio
        quisquam debitis reprehenderit vel impedit, fugit sint. Quas, soluta?
        Placeat delectus dolorem id numquam tempore illo officia nam aspernatur
        unde quaerat earum doloribus qui, eum sit eius soluta vel iure deserunt
        similique dolorum perspiciatis atque animi? Expedita nulla aspernatur
        reiciendis tempora, suscipit asperiores dolorem qui iure repudiandae eos
        ea accusantium unde optio. Mollitia, tenetur maiores accusantium ad
        facilis quia voluptas debitis voluptates consectetur unde? Beatae,
        temporibus ad eaque laudantium dignissimos rerum nobis, distinctio,
        aperiam quos in explicabo ipsa tempore. Quidem sequi consectetur
        necessitatibus voluptates aliquid non dolor, cumque quisquam nulla est
        officia sapiente magni ab sed facilis repudiandae laborum eveniet minus,
        perferendis, placeat obcaecati provident. Fugit, fugiat tenetur. Rem
        illo numquam minima sit corrupti culpa consequatur. Assumenda sit
        delectus, sunt asperiores fugit veniam aut laudantium maiores
        architecto, culpa, aspernatur perspiciatis omnis dolor. Voluptatem
        ipsam, ipsum quidem tenetur, nihil ratione reiciendis fuga incidunt
        similique quasi assumenda aut aspernatur eligendi iure officiis
        excepturi quae. Voluptates minima nulla unde saepe cumque iusto! Eaque
        eum pariatur dolor doloremque.
      </p>
      <h1>{stayTrue.value || isCenterdAndVisible.value ? "visible" : "No"}</h1>
      <h2> Stay True:{emoji(stayTrue.value) }</h2>
      <span
        ref={square}
        style={{ display: "block", minHeight: "50px", border: "1px solid red" }}
      >
        CARRÉ
      </span>
      <p>Ce composant est observé par IntersectionObserver. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae corporis blanditiis reiciendis consequatur impedit. Aperiam vitae mollitia voluptate voluptates molestiae quae alias excepturi doloribus sint provident at repellendus velit dolorum veniam atque accusantium, sequi optio beatae. Ullam quos nihil iusto sed autem placeat provident est, modi numquam obcaecati voluptatem! Deleniti quas accusantium nobis, suscipit reiciendis natus sunt eaque sit veritatis aperiam distinctio quam placeat. Voluptate vel non fugit autem, minus quod, nihil sit harum impedit, quidem culpa alias molestiae assumenda ab. Numquam obcaecati vel, rerum, molestias nesciunt nam fugiat, nihil sed inventore quod provident. Consequuntur odit iusto minus ab totam!</p>
    </section>
  );
});
