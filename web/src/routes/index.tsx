import PunchDiamonds from "~/components/punch/diamonds/mod"
import PunchDiamondsTeeth from "~/components/punch/diamonds-teeth/mod"
import Fonctions from "~/components/landing/fns/mod";
import SloganInscription from "~/components/landing/inscription";
import Footer from "~/components/landing/footer";
import Evenements from "~/components/landing/evenements";
import Hero from "~/components/landing/hero";
import Header from "~/components/header";


export default () => <div class="bg-papier min-h-screen w-screen">
    <Header
        className="bg-orange border-b-2 border-ink"
        links={[
            {
                titre: "Espace authentifié",
                href: "/auth",
                className: "bg-papier text-ink"
            }
        ]}/>
    <Hero/>
    <PunchDiamonds to="papier"/>
    <Evenements/>
    <PunchDiamondsTeeth from="papier" to="orange" class="-mb-1" />
    <Fonctions 
        hauteur_fn={35}
        fns={[
            "Tous les évènements à porter de 2 clics",
            "Ne plus rater une soirée",
            "Inscription sans tracas",
            "Annonces en temps réel",
            "Découvrir de nouvelles associations",
            "Sur ton téléphone, sur ton ordinateur..."
        ]}/>
    
    <PunchDiamondsTeeth from="orange" to="ink" style="margin-left: -12px;z-index:0;overflow:hidden;
        width: calc(100% + 12px);margin-top:0px;" />
    <SloganInscription/>
    <Footer/>
</div>