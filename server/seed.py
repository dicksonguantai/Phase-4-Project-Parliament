from app import app, db
from models import MP, Bill, User, VotingRecord
from datetime import date
from faker import Faker

fake = Faker()

def seed_database():
    with app.app_context():
        # Create tables
        db.create_all()

        # Seed MPs
        for _ in range(20):
            mp = MP(name=fake.name(), affiliation=fake.word(), constituency=fake.word())
            db.session.add(mp)

        db.session.commit()

        # Seed Users (Including MPs)
        for _ in range(30):
            if fake.boolean():  # Randomly assign role (user or mp)
                user = User(name=fake.name(), role='user', password=fake.password(), email=fake.email())
            else:
                user = MP(name=fake.name(), affiliation=fake.word(), constituency=fake.word())

            db.session.add(user)

        db.session.commit()

        # Seed Bills
        for _ in range(30):
            mp_id = fake.random_element(elements=[mp.id for mp in MP.query.all()])
            bill = Bill(
                title=fake.sentence(),
                description=fake.paragraph(),
                submission_date=fake.date_between(start_date='-1y', end_date='today'),
                outcome_status=fake.boolean(),
                upvotes=fake.random_int(min=0, max=100),
                downvotes=fake.random_int(min=0, max=100),
                mp_id=mp_id
            )
            db.session.add(bill)

        db.session.commit()

        # Seed Voting Records
        for _ in range(20):
            bill_id = fake.random_element(elements=[bill.id for bill in Bill.query.all()])
            voting_record = VotingRecord(
                bill_id=bill_id,
                vote_status=fake.boolean()
            )
            db.session.add(voting_record)

        db.session.commit()

if __name__ == '__main__':
    seed_database()
