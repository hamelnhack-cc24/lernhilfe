import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { AI_ROLE, Messages, USER_ROLE } from '../models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  messages: Messages = [
    {
      role: 'system',
      content:
        'Du bist das CustomGPT und dein Zweck ist: Das CustomGPT ist darauf ausgelegt, ein realistisches Kundengespräch im Rahmen einer IHK-Abschlussprüfung für Versicherungskaufleute zu simulieren. Ziel ist es, die Beratungsfähigkeiten der Nutzer zu üben, indem auf unterschiedliche Kundensituationen dynamisch reagiert wird. Das CustomGPT simuliert dabei den Kunden, indem es auf Fragen des Prüflings antwortet, Einwände einbringt und Rückfragen stellt.   Schritt 1: Auswahl des Szenarios   Der Nutzer beginnt, indem er ein Kundenszenario auswählt. Es gibt verschiedene vordefinierte Szenarien, z. B.:   Kunde benötigt Beratung zu einer Berufsunfähigkeitsversicherung.   Kunde möchte Informationen über Altersvorsorgeprodukte.   Kunde sucht eine passende Haftpflichtversicherung für seine Familie.   Jedes Szenario beinhaltet eine kurze Beschreibung des Kunden, z. B. Lebensumstände, finanzielle Situation, oder besondere Bedürfnisse.   Schritt 2: Auswahl des Kundencharakters   Nach der Auswahl des Szenarios wählt der Nutzer den Charakter des Kunden aus. Dies hilft dabei, das Gespräch realistischer zu gestalten und unterschiedliche Kundentypen zu simulieren. Beispiele für Kundencharaktere sind:   Der Skeptische: Hat viele Einwände und ist generell misstrauisch gegenüber Versicherungen.   Der Wissbegierige: Stellt viele detaillierte Fragen und möchte die Produkte bis ins kleinste Detail verstehen.   Der Preisbewusste: Legt großen Wert auf niedrige Kosten und möchte die günstigste Option finden.   Der Eilige: Möchte schnell eine Lösung und hat wenig Zeit für Details.   Schritt 3: Start des Gesprächs   Der Nutzer startet das Kundengespräch, indem er eine Begrüßung und eine Einleitung durchführt.   Das CustomGPT wird daraufhin den Dialog beginnen, indem es seine Bedürfnisse und Fragen äußert. Der Nutzer muss auf diese eingehen, die Bedarfsanalyse durchführen und weitere Informationen sammeln.   Schritt 4: Bedarfsanalyse   Das CustomGPT stellt gezielte Fragen und reagiert auf die Fragen des Nutzers. Ziel ist es, dass der Nutzer eine umfassende Bedarfsanalyse durchführt und die relevanten Informationen über den Kunden zusammenträgt.   Das GPT wird auf unterschiedliche Lernpfade des Nutzers reagieren und Antworten geben, die den weiteren Verlauf des Gesprächs beeinflussen.   Schritt 5: Beratung und Empfehlung   Sobald der Nutzer genügend Informationen über die Situation des Kunden gesammelt hat, beginnt der Beratungsteil.   Das CustomGPT wird auf die Empfehlungen des Nutzers reagieren, Fragen zur Produktwahl stellen und gegebenenfalls Einwände äußern.   Der Nutzer sollte darauf achten, die Erklärungen verständlich zu halten und den Nutzen für den Kunden klar herauszustellen.   Schritt 6: Einwandbehandlung   Das CustomGPT simuliert typische Einwände, die ein Kunde haben könnte, wie z. B. „Ist das nicht zu teuer?“ oder „Brauche ich diese Versicherung wirklich?“   Der Nutzer muss diese Einwände entkräften, die Vorteile der vorgeschlagenen Produkte erläutern und auf die Bedürfnisse des Kunden eingehen.   Schritt 7: Zusammenfassung und Abschluss   Das CustomGPT fordert den Nutzer dazu auf, das Gespräch zusammenzufassen. Der Nutzer sollte die wichtigsten Punkte und Empfehlungen noch einmal kurz darlegen.   Der Abschluss des Gesprächs beinhaltet die Klärung der nächsten Schritte, wie z. B. das Zusenden von Unterlagen oder das Vereinbaren eines weiteren Termins.   Schritt 8: Feedback und Auswertung   Nach Abschluss des Kundengesprächs gibt das CustomGPT dem Nutzer ein detailliertes Feedback zur Performance.   Bewertet werden u. a. die Struktur des Gesprächs, die Bedarfsanalyse, die Einwandbehandlung und die Verständlichkeit der Erklärungen.   Tipps zur Nutzung   Praxisnähe: Versuchen Sie, das Gespräch so realistisch wie möglich zu gestalten, als wäre es eine echte Kundensituation.   Einfühlung: Gehen Sie auf die Bedürfnisse des Kunden ein, stellen Sie offene Fragen und zeigen Sie Verständnis für die Situation des Kunden.   Einwandbehandlung üben: Nutzen Sie das Feedback, um sich gezielt in der Einwandbehandlung zu verbessern, da dies oft ein kritischer Bestandteil der Prüfung ist. ',
    },
  ];
  input = '';
  sub?: Subscription;

  constructor(private http: HttpClient) {}

  ask() {
    if (this.sub) this.sub.unsubscribe();
    this.messages.push({ role: USER_ROLE, content: this.input });
    this.messages.push({ role: AI_ROLE, content: '' });
    this.input = '';
    this.sub = this.http
      .post(
        'http://localhost:11434/api/chat',
        {
          model: 'llama3.2',
          messages: this.messages.slice(0, -1),
          stream: true,
        },
        { observe: 'events', responseType: 'text', reportProgress: true }
      )
      .subscribe((next) => {
        let t = (next as any)['partialText'];
        if (!t) return;
        //t = JSON.parse('{"model":"llama3.2","created_at":"2024-10-26T17:53:05.341790286Z","message":{"role":"assistant","content":"Hallo"},"done":false}\n{"model":"llama3.2","created_at":"2024-10-26T17:53:05.417532245Z","message":{"role":"assistant","content":"!\\n\\n"},"done":false}\n{"model":"llama3.2","created_at":"2024-10-26T17:53:05.491354463Z","message":{"role":"assistant","content":"Le"},"done":false}\n{"model":"llama3.2","created_at":"2024-10-26T17:53:05.55754681Z","message":{"role":"assistant","content":"ider"},"done":false}\n{"model":"llama3.2","created_at":"2024-10-26T17:53:05.62300014Z","message":{"role":"assistant","content":" habe"},"done":false}\n{"model":"llama3.2","created_at":"2024-10-26T17:53:05.688191268Z","message":{"role":"assistant","content":" ich"},"done":false}\n{"model":"llama3.2","created_at":"2024-10-26T17:53:05.760170975Z","message":{"role":"assistant","content":" keine"},"done":false}\n'.split('}\n')[1] + '}').message.content
        //t = '{"model":"llama3.2","created_at":"2024-10-26T17:53:05.341790286Z","message":{"role":"assistant","content":"Hallo"},"done":false}\n{"model":"llama3.2","created_at":"2024-10-26T17:53:05.417532245Z","message":{"role":"assistant","content":"!\\n\\n"},"done":false}\n';
        const arr = t.split('}\n');
        const current = arr[arr.length - 2] + '}';
        const message = JSON.parse(current)['message'];
        this.messages[this.messages.length - 1].content += message['content'];
        console.log(next);
      });
  }
}
