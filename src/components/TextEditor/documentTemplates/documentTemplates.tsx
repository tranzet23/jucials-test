import petrovich from 'petrovich';
import { IdocumentTemplatesTypes, CourtPeople } from './documentTemplatesTypes';

class DocumentTemplates implements IdocumentTemplatesTypes {
  date: Date;
  readonly months: string[];
  caseNumber: string;
  people: CourtPeople;
  courtName: string;
  exceptions: string[];
  claims: string[];

  constructor(people) {
    this.date = new Date();
    this.months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];
    this.caseNumber = '№ 2-4045-08-12с';
    this.people = people;
    this.courtName = 'Мировой Белгородский';
  }

  getShortName(name) {
    return `${name.last} ${name.first[0]}.${name.middle[0]}.`;
  }

  getFullName(name) {
    return `${name.last} ${name.first} ${name.middle}`;
  }

  // === Блоки ===

  createComplainBlock() {
    return `
           <p style="text-align:justify;"><strong>Обсуждается заявленный отвод.</strong></p><p style="text-align:justify;">Записать выступления всех участников процесса.</p><p style="text-align:justify;"><strong>Суд определил:&nbsp;</strong>Основания для отвода предусмотрены ст.16 ГПК РФ, перечень оснований является исчерпывающим. В соответствии со смыслом ст.16 ГПК РФ судья не может рассматривать дело и подлежит отводу, если он лично прямо или косвенно заинтересован в исходе дела либо имеются иные обстоятельства, вызывающие сомнение в его объективности и беспристрастности. Учитывая, что доводы заявителей об отводе судьи не основаны на ст.16 ГПК РФ, доказательств заинтересованности судьи в исходе дела не представлено, как не представлено доказательств необъективности или беспристрастности судьи, суд считает, что заявленный отвод не подлежит удовлетворению, а изложенные доводы рассматривает как субъективное мнение заявителей. &nbsp;Исходя из вышеизложенного, руководствуясь ст.16 ГПК РФ, заявление об отводе председательствующего судьи -- оставить без удовлетворения, рассмотрение дела продолжить в том же составе суда.</p>
        `;
  }
  
  createPetitionBlock() {
    return `
            <p style="text-align:justify;">Ходатайство истца:&nbsp;</p><p style="text-align:justify;">Обсуждается ходатайство.</p><p style="text-align:justify;">Суд определил:&nbsp;</p>
        `;
  }

  createPieceAgreement() {
    return `
            <p style="text-align:justify;"><strong>Ходатайство сторон: просим суд утвердить мировое соглашение.</strong></p><p style="text-align:justify;"><strong>Письменное заявление с условиями мирового соглашения приобщается к материалам дела.</strong> (Если письменного заявления у сторон нет, то условия мира записать в протоколе).</p><p style="text-align:justify;"><strong>С условиями мирового соглашения согласны.</strong></p><p style="text-align:justify;">Подпись и расшифровка всех сторон по делу.</p><p style="text-align:justify;"><strong>Суд разъясняет последствия утверждения мирового соглашения и получение исполнительного листа.</strong></p><p style="text-align:justify;"><strong>Последствия понятны.</strong></p><p style="text-align:justify;">Подпись и расшифровка всех сторон по делу.&nbsp;</p><p style="text-align:justify;"><strong>Суд проверяет материалы дела, исследует оригиналы письменных доказательств.</strong></p><p style="text-align:justify;"><strong>Суд предлагает представить дополнения и вопросы.</strong></p><p style="text-align:justify;"><strong>Дополнений нет.</strong></p><p style="text-align:justify;"><strong>Вопросов нет.</strong></p><p style="text-align:justify;"><strong>Суд удалился на совещание.</strong></p><p style="text-align:justify;"><strong>По делу вынесено и оглашено определение.</strong></p><p style="text-align:justify;"><strong>Разъяснено его содержание, порядок и срок обжалования.</strong></p>
        `;
  }

  createClaimAcceptance() {
    return `
            <p style="text-align:justify;"><strong>Иск признаю.&nbsp;</strong></p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Подпись ответчика и расшифровка росписи.</p><p style="text-align:justify;"><strong>Суд разъясняет последствия признания иска.</strong></p><p style="text-align:justify;"><strong>Последствия понятны.</strong></p><p style="text-align:justify;">Подпись ответчика и расшифровка.&nbsp;</p><p style="text-align:justify;"><strong>Суд проверяет материалы дела, исследует оригиналы письменных доказательств.</strong></p><p style="text-align:justify;"><strong>Суд предлагает представить дополнения и вопросы.</strong></p><p style="text-align:justify;"><strong>Дополнений нет.</strong></p><p style="text-align:justify;"><strong>Вопросов нет.</strong></p><p style="text-align:justify;"><strong>Суд удалился на совещание.</strong></p><p style="text-align:justify;"><strong>По делу вынесено и оглашено решение.</strong></p><p style="text-align:justify;"><strong>Разъяснено его содержание, порядок и срок обжалования, срок изготовления мотивированного решения.</strong></p>
        `;
  }

  createClaimDeny() {
    return `
            <p style="text-align:justify;">Истец: от иска отказываюсь.</p><p style="text-align:justify;">Подпись истца и расшифровка подписи.</p><p style="text-align:justify;"><strong>Суд разъясняет последствия отказа от иска.</strong></p><p style="text-align:justify;"><strong>Последствия понятны.</strong></p><p style="text-align:justify;">Подпись истца и расшифровка подписи.</p><p style="text-align:justify;"><strong>Суд проверяет материалы дела, исследует оригиналы письменных доказательств.</strong></p><p style="text-align:justify;"><strong>Суд предлагает представить дополнения и вопросы.</strong></p><p style="text-align:justify;"><strong>Дополнений нет.</strong></p><p style="text-align:justify;"><strong>Вопросов нет.</strong></p><p style="text-align:justify;"><strong>Суд удалился на совещание.</strong></p><p style="text-align:justify;"><strong>По делу вынесено и оглашено определение.</strong></p><p style="text-align:justify;"><strong>Разъяснено его содержание, порядок и срок обжалования.</strong></p>
        `;
  }

  // =============

  // === Шаблоны ===
  // Документация по работе с библеотекой для изменения падежей: https://github.com/petrovich/petrovich-js

  // Шаблон протокола заседания
  createRecordTemplate() {
    return `<p style="margin-left:0;"><strong>Протокол судебного заседания по гражданскому делу</strong></p><p style="margin-left:0;">&nbsp;</p><p style="margin-left:0;text-align:justify;">${this.date.getDate()} ${
      this.months[this.date.getMonth()]
    } ${this.date.getFullYear()} года</p><p>Люблинский районный суд г. Москвы</p><p>В составе федерального судьи ${this.getShortName(
      petrovich(this.people.judge, 'genitive'),
    )},</p><p>при секретаре ${this.getShortName(
      petrovich(this.people.secretary, 'prepositional'),
    )}</p><p>&nbsp;</p><p>Рассмотрев в открытом судебном заседании гражданское дело ${
      this.caseNumber
    }</p><p>В зале № <u><strong>0</strong></u></p><p>По иску ${this.getShortName(
      petrovich(this.people.claimant, 'genitive'),
    )} к ${this.getShortName(
      petrovich(this.people.defendant, 'dative'),
    )} <strong><u>предмет иска</u></strong></p><p>Судебное заседание открыто в <strong><u>00:00</u></strong> часов</p><p>В судебное заседание явились:</p><p>&nbsp;</p><p>Из вызванных в судебное заседание не явились:</p><p>&nbsp;</p>`;
  }

  createProtocolTemplate() {
    return `
            <p style="text-align:center;"><strong>ОБРАЗЕЦ&nbsp; ПРОТОКОЛА СУДЕБНОГО ЗАСЕДАНИЯ</strong></p>
            <p>&nbsp;</p>
            <p style="text-align:center;">${this.date.toLocaleString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}</p>
            <p style="text-align:center;">Белгород</p>
            <p>${this.courtName} суд в составе:</p>
            <p>председательствующего судьи, ${this.getFullName(
              petrovich(this.people.judge.name, 'genitive'),
            )}</p>
            <p>при секретаре, ${this.getFullName(
              petrovich(this.people.secretary.name, 'prepositional'),
            )}</p>
            <p style="text-align:justify;">разбирал в открытом судебном заседании дело по иску ${this.getShortName(
              petrovich(this.people.claimant.name, 'accusative'),
            )} к ${this.getShortName(
      petrovich(this.people.defendant.name, 'dative'),
    )}${
      this.people.thirdPerson
        ? `, 3-е лицо: ${this.getShortName(this.people.thirdPerson)}`
        : ``
    } о (указать о чем иск).</p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">Заседание открыто в ${this.date.toLocaleString(
              'ru-RU',
              { timeStyle: 'short' },
            )}.&nbsp;</p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Председательствующий открывает судебное заседание и объявляет, какое дело слушается.&nbsp;</strong>
            </p>
            <p style="text-align:justify;">
                <strong>Секретарь докладывает о явке.</strong>
            </p>
            <p style="text-align:justify;">
                <strong>Явились:</strong>
            </p>
            <p style="text-align:justify;">
              <strong>Истец</strong>: 
              ${
                this.people.claimant.isIndividual
                  ? `${this.getFullName(this.people.claimant.name)}`
                  : this.people.claimantRepresentative
                  ? `${this.getFullName(
                      this.people.claimantRepresentative.name,
                    )}, ${
                      this.people.claimantRepresentative.isAdvocate
                        ? `ордер`
                        : `доверенность`
                    } от ${
                      this.people.claimantRepresentative.powerOfAttorney.date
                    }${
                      this.people.claimantRepresentative.powerOfAttorney.number
                        ? ` номер ${this.people.claimantRepresentative.powerOfAttorney.number}`
                        : ``
                    }`
                  : ''
              } - ${this.people.claimant.inCourt ? 'явился' : 'не явился'}
            </p>  
            ${
              this.people.claimantRepresentative
                ? `
              <p style="text-align:justify;">
                <strong>Пр.истца</strong> – ${
                  this.people.claimantRepresentative.isAdvocate
                    ? `адвокат ${this.getFullName(
                        this.people.claimantRepresentative.name,
                      )} ордер от ${
                        this.people.claimantRepresentative.powerOfAttorney.date
                      } ${
                        this.people.claimantRepresentative.powerOfAttorney
                          .number
                          ? `номер ${this.people.claimantRepresentative.powerOfAttorney.number}`
                          : ''
                      }`
                    : `${this.getFullName(
                        this.people.claimantRepresentative.name,
                      )} доверенность от ${
                        this.people.claimantRepresentative.powerOfAttorney.date
                      } номер ${
                        this.people.claimantRepresentative.powerOfAttorney
                          .number
                      }`
                }
              </p>
            `
                : ''
            }
            <p style="text-align:justify;">
                <strong>Ответчик</strong>: 
                ${
                  this.people.defendant.isIndividual
                    ? `${this.getFullName(this.people.defendant.name)} ${
                        this.people.defendant.dateOfBirth
                      }`
                    : this.people.defendantRepresentative
                    ? `${this.getFullName(
                        this.people.defendantRepresentative.name,
                      )}, ${
                        this.people.defendantRepresentative.isAdvocate
                          ? `ордер`
                          : `доверенность`
                      } от ${
                        this.people.defendantRepresentative.powerOfAttorney.date
                      }${
                        this.people.defendantRepresentative.powerOfAttorney
                          .number
                          ? ` номер ${this.people.defendantRepresentative.powerOfAttorney.number}`
                          : ``
                      }`
                    : ''
                } - ${this.people.defendant.inCourt ? 'явился' : 'не явился'}
            </p>
            ${
              this.people.defendantRepresentative
                ? `
              <p style="text-align:justify;">
                <strong>Пр.ответчика</strong> - ${
                  this.people.defendantRepresentative.isAdvocate
                    ? `адвокат ${this.getFullName(
                        this.people.defendantRepresentative.name,
                      )} ордер от ${
                        this.people.defendantRepresentative.powerOfAttorney.date
                      } ${
                        this.people.defendantRepresentative.powerOfAttorney
                          .number
                          ? `номер ${this.people.defendantRepresentative.powerOfAttorney.number}`
                          : ''
                      }`
                    : `${this.getFullName(
                        this.people.defendantRepresentative.name,
                      )} доверенность от ${
                        this.people.defendantRepresentative.powerOfAttorney.date
                      } номер ${
                        this.people.defendantRepresentative.powerOfAttorney
                          .number
                      }`
                }
              </p>
            `
                : ''
            }
            ${
              this.people.thirdPerson
                ? `
                <p style="text-align:justify;">
                  <strong>3-е лицо</strong>: 
                  ${
                    this.people.thirdPerson.isIndividual
                      ? `${this.getFullName(this.people.thirdPerson.name)}`
                      : this.people.thirdPersonRepresentative
                      ? `${this.getFullName(
                          this.people.thirdPersonRepresentative.name,
                        )}, ${
                          this.people.thirdPersonRepresentative.isAdvocate
                            ? `ордер`
                            : `доверенность`
                        } от ${
                          this.people.thirdPersonRepresentative.powerOfAttorney
                            .date
                        }${
                          this.people.thirdPersonRepresentative.powerOfAttorney
                            .number
                            ? ` номер ${this.people.thirdPersonRepresentative.powerOfAttorney.number}`
                            : ``
                        }`
                      : ''
                  } - ${
                    this.people.thirdPerson.inCourt ? 'явился' : 'не явился'
                  }
                </p>
            `
                : ''
            }
            <p style="text-align:justify;">
                <strong>Личность явившихся лиц установлена.</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Объявлен состав суда.</strong>
            </p>
            <p style="text-align:justify;">
                <strong>Разъяснено право отвода.</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
              <strong>Отводов нет.</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Разъяснены права и обязанности</strong>
            </p>
            <p style="text-align:justify;">
                <strong>Права и обязанности понятны</strong>
            </p>
            <p style="text-align:justify;">
                <strong>Ходатайств нет</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Обсуждается вопрос о рассмотрении дела в отсутствие … (например, ответчика).</strong>
            </p>
            <p style="text-align:justify;">Истец: считаю возможным.</p>
            <p style="text-align:justify;">3-е лицо: на усмотрение суда.</p>
            <p style="text-align:justify;">Суд на месте определил: начать судебное заседание (или: ввиду неявки ответчика и отсутствия у суда сведений о получении им судебного извещения, слушание по делу отложить на (указать полностью число и время). В адрес не явившегося ответчика направить судебное извещение, явившихся участников процесса известить под роспись. (Внимание: последнее предложение можно записать короче: «Известить стороны»).</p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Доложено дело.</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Истец: иск поддерживаю по изложенным в исковом заявлении основаниям, дополнений не имею.</strong> (Если еще выступает, то записать основную суть выступления).
            </p>
            <p style="text-align:justify;">
                <strong>Вопросов нет.</strong>
            </p>
            <p style="text-align:justify;">
                <strong>Ответчик: иск не признаю.</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <i>
                    <strong>
                        <u>Если есть вопросы:&nbsp;</u>
                    </strong>
                </i>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">На вопрос суда истец:</p>
            <p style="text-align:justify;">- Я постоянно проживаю в спорной квартире, иного жилья не имею.</p>
            <p style="text-align:justify;">На вопрос пр.ответчика истец:</p>
            <p style="text-align:justify;">- Кроме меня, в квартире проживает моя мать, иных лиц нет.</p>
            <p style="text-align:justify;">Вопросов нет.</p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">Если много вопросов, в протоколе записать следующее:</p>
            <p style="text-align:justify;">На вопросы суда истец:</p>
            <p style="text-align:justify;">- Квартира имеет три жилые комнаты.</p>
            <p style="text-align:justify;">- Я имею регистрацию в спорной квартире.</p>
            <p style="text-align:justify;">- В квартире проживаю один.</p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Ответчик: иск не признаю.</strong> Далее записать основную суть выступления.
            </p>
            <p style="text-align:justify;">
                <strong>Вопросов нет.</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">Если есть к ответчику вопросы, то см. выше (также как и при наличии вопросов к истцу).</p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>3-е лицо: с иском согласны</strong> (или не согласны) и изложить основную суть выступления.
            </p>
            <p style="text-align:justify;">
                <strong>Вопросов нет.</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">Если есть вопросы к 3-ему лицу, то см. выше (также как при наличии вопросов истцу).</p>
            <p style="text-align:justify;">Вопросов нет.</p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Суд предлагает представить дополнения и вопросы.</strong>
            </p>
            <p style="text-align:justify;">
                <strong>Дополнений нет.</strong>
            </p>
            <p style="text-align:justify;">
                <strong>Вопросов нет.</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">Если есть дополнения, то записать основную суть выступления, сначала выступает истец с дополнениями, затем ответчик, после 3-е лицо.</p>
            <p style="text-align:justify;">Например:</p>
            <p style="text-align:justify;">Истец: изложить основную суть выступления.</p>
            <p style="text-align:justify;">Ответчик: изложить основную суть выступления.</p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <i>
                    <u>&nbsp;</u>
                </i>
            </p>
            <p style="text-align:justify;">
                <i>
                    <u>Если необходимо допросить свидетеля:</u>
                </i>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">Ходатайство пр.ответчика: прошу допросить свидетеля ФИО.&nbsp;</p>
            <p style="text-align:justify;">Обсуждается ходатайство.</p>
            <p style="text-align:justify;">Истец: возражаю.</p>
            <p style="text-align:justify;">3-е лицо: на усмотрение суда.</p>
            <p style="text-align:justify;">Суд определил: ходатайство удовлетворить, допросить заявленного свидетеля.&nbsp;</p>
            <p style="text-align:justify;">В зал приглашается свидетель.</p>
            <p style="text-align:justify;">ФИО свидетеля, дата рождения, адрес регистрации, место работы и должность.</p>
            <p style="text-align:justify;">Суд предупреждает свидетеля об уголовной ответственности.</p>
            <p style="text-align:justify;">Подписка отобрана.</p>
            <p style="text-align:justify;">Свидетель Иванов: записать основную суть выступления.</p>
            <p style="text-align:justify;">На вопрос суда</p>
            <p style="text-align:justify;">Иванов: я действительно никогда не видел Петрова в нашем доме.</p>
            <p style="text-align:justify;">На вопрос пр.ответчика</p>
            <p style="text-align:justify;">Иванов: записать ответ свидетеля.</p>
            <p style="text-align:justify;">Внимание для секретаря: сначала вопросы свидетелю задает тот, кто его пригласил (в данном случае сторона ответчика), потом вопросы может задавать другая сторона (в данном случае сторона истца), после вопросы свидетелю задает 3-е лицо). &nbsp;</p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Суд исследовал материалы дела, оригиналы доказательств.</strong>
            </p>
            <p style="text-align:justify;">
                <strong>Оглашены:</strong>
            </p>
            <p style="text-align:justify;">л.д. 5 – свидетельство о регистрации</p>
            <p style="text-align:justify;">л.д. 6 – кадастровый план</p>
            <p style="text-align:justify;">л.д. 7-10 – технический паспорт</p>
            <p style="text-align:justify;">л.д. 11, 12, 13 – постановления</p>
            <p style="text-align:justify;">л.д. 14 – акт согласования границ</p>
            <p style="text-align:justify;">л.д. 15 – свидетельство о наследстве</p>
            <p style="text-align:justify;">л.д. 16 – выписка из домовой книги</p>
            <p style="text-align:justify;">л.д. 17, 18 – письма</p>
            <p style="text-align:justify;">л.д. 19 – акт приема-передачи</p>
            <p style="text-align:justify;">л.д. 20 –ответ КУМИ</p>
            <p style="text-align:justify;">л.д. 21-23 – выписки из ЕГРП</p>
            <p style="text-align:justify;">л.д. 24-27 – выписка из ЕГРЮЛ</p>
            <p style="text-align:justify;">л.д. 28 – справка БТИ</p>
            <p style="text-align:justify;">л.д. 29 – поэтажный план с экспликацией</p>
            <p style="text-align:justify;">л.д. 30 – выписка из протокола собрания</p>
            <p style="text-align:justify;">л.д. 31 – похозяйственная книга</p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Дополнений нет.</strong>
            </p>
            <p style="text-align:justify;">
                <strong>Вопросов нет.</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Рассмотрение дела по существу закончено.</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Судебные прения.</strong>
            </p>
            <p style="text-align:justify;">Истец: записать основную суть выступления.</p>
            <p style="text-align:justify;">Ответчик: записать основную суть выступления.</p>
            <p style="text-align:justify;">3-е лицо: записать суть выступления.</p>
            <p style="text-align:justify;">Если не хотят выступать, записать: выступлений нет.</p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Реплик нет.</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Суд удалился на совещание.</strong>
            </p>
            <p style="text-align:justify;">
                <strong>По делу вынесена и оглашена резолютивная часть решения (определение).</strong>
            </p>
            <p style="text-align:justify;">
                <strong>Разъяснено его содержание, порядок и срок обжалования, срок изготовления мотивированного решения.</strong>
            </p>
            <p style="text-align:justify;">
                <strong>&nbsp;Разъяснено право на ознакомление с протоколом и подачу на него замечаний.</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Протокол изготовлен и подписан 12 марта 2008 года.&nbsp;</strong>
            </p>
            <p style="text-align:justify;">Внимание секретаря: срок изготовления протокола не более трех дней.</p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Судья:</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>
            <p style="text-align:justify;">
                <strong>Секретарь: &nbsp;</strong>
            </p>
            <p style="text-align:justify;">&nbsp;</p>`;
  }
}

export default DocumentTemplates;
