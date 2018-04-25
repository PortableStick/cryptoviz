import fontAwesome from '@fortawesome/fontawesome';
import faEthereum from '@fortawesome/fontawesome-free-brands/faEthereum';
import faBitcoin from '@fortawesome/fontawesome-free-brands/faBitcoin';
import faDollar from '@fortawesome/fontawesome-free-solid/faDollarSign';
import faEuro from '@fortawesome/fontawesome-free-solid/faEuroSign';
import faCaretUp from '@fortawesome/fontawesome-free-solid/faCaretUp';
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown';
import faMinus from '@fortawesome/fontawesome-free-solid/faMinus';

export default function initFaLibrary() {
  fontAwesome.library.add(faEthereum, faBitcoin, faDollar, faEuro, faCaretUp, faCaretDown, faMinus);
}

