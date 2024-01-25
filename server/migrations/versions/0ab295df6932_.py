"""empty message

Revision ID: 0ab295df6932
Revises: 8bbb636b0683
Create Date: 2024-01-25 12:55:13.659064

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0ab295df6932'
down_revision = '8bbb636b0683'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('_alembic_tmp_mps')
    with op.batch_alter_table('mps', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=255), nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(length=255), nullable=False))
        batch_op.drop_column('name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('mps', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(length=255), nullable=False))
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    op.create_table('_alembic_tmp_mps',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('affiliation', sa.VARCHAR(length=255), nullable=True),
    sa.Column('constituency', sa.VARCHAR(length=255), nullable=True),
    sa.Column('first_name', sa.VARCHAR(length=255), nullable=False),
    sa.Column('last_name', sa.VARCHAR(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
