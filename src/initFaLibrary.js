import fontAwesome from '@fortawesome/fontawesome';
import faEthereum from '@fortawesome/fontawesome-free-brands/faEthereum';
import faBitcoin from '@fortawesome/fontawesome-free-brands/faBitcoin';
import faDollar from '@fortawesome/fontawesome-free-solid/faDollarSign';
import faEuro from '@fortawesome/fontawesome-free-solid/faEuroSign';

export default function initFaLibrary() {
  fontAwesome.library.add(faEthereum, faBitcoin, faDollar, faEuro);
}

